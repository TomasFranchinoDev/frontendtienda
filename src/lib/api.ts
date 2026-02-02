import type { ShopConfig } from "./../types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

/**
 * Custom error class that includes HTTP status code
 */
export class ApiError extends Error {
    constructor(
        message: string,
        public status: number
    ) {
        super(message);
        this.name = "ApiError";
    }
}

/**
 * Cookie-first fetch wrapper. Enforces `credentials: "include"` and blocks manual token headers.
 */
type ApiRequestInit = Omit<RequestInit, "credentials"> & {
    headers?: HeadersInit;
};

const buildUrl = (path: string) => {
    if (path.startsWith("http")) return path;
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    return `${API_BASE_URL}${normalizedPath}`;
};

const assertNoAuthHeader = (headers: Headers) => {
    if (headers.has("authorization")) {
        throw new Error("Authorization headers are not allowed; rely on HttpOnly cookies.");
    }
};

export async function apiFetch<T = unknown>(path: string, init: ApiRequestInit = {}): Promise<T> {
    const headers = new Headers(init.headers);
    if (!headers.has("accept")) headers.set("accept", "application/json");
    if (init.body && !headers.has("content-type")) headers.set("content-type", "application/json");

    assertNoAuthHeader(headers);

    const response = await fetch(buildUrl(path), {
        ...init,
        headers,
        credentials: "include",
    });

    const isJson = response.headers.get("content-type")?.includes("application/json");

    // ... dentro de tu función apiFetch ...

    if (!response.ok) {
        let message = "Ocurrió un error inesperado"; // Mensaje por defecto seguro

        // CASO 1: Errores del Servidor (500-599)
        // 🛑 STOP: Nunca mostramos el detalle al usuario, podría ser un Traceback.
        if (response.status >= 500) {
            // Opcional: Loguear en consola para el desarrollador, pero NO mostrar en UI
            if (process.env.NODE_ENV === 'development') {
                console.error('🔥 Server Error (500)');
            }
            message = "Error interno del servidor. Por favor intente más tarde.";
        }

        // CASO 2: Errores del Cliente (400-499)
        // ✅ OK: Intentamos parsear para dar feedback útil (ej: "Email inválido")
        else if (isJson) {
            try {
                const data = await response.json();

                // A. Buscar mensaje 'detail' (Estándar DRF)
                const detail = (data as Record<string, unknown>).detail;

                if (typeof detail === "string" && detail.trim().length > 0) {
                    message = detail;
                }
                // B. Buscar errores de validación por campo (Estándar Django Forms/Serializers)
                else if (typeof data === "object" && data !== null) {
                    // Filtramos claves sospechosas para no mostrar metadata interna
                    const errors = Object.entries(data)
                        .filter(([key]) => !['status', 'code', 'stack'].includes(key)) // Sanitización extra
                        .map(([key, value]) => {
                            // Formateamos arrays de errores (ej: { email: ["Invalido"] })
                            const valStr = Array.isArray(value) ? value.join(", ") : String(value);
                            // Capitalizamos la clave para que se vea mejor (email -> Email)
                            const keyStr = key.charAt(0).toUpperCase() + key.slice(1);
                            return `${keyStr}: ${valStr}`;
                        })
                        .join("\n");

                    if (errors.trim().length > 0) {
                        message = errors;
                    }
                }
            } catch (err) {
                // Si falla el parseo JSON en un 400, usamos un mensaje genérico
                message = "Solicitud inválida.";
            }
        }

        throw new ApiError(message, response.status);
    }

    if (response.status === 204) {
        return null as T;
    }

    if (isJson) {
        return (await response.json()) as T;
    }

    return (await response.text()) as T;
}

export async function getShopConfig(revalidateSeconds = 0) {
    return apiFetch<ShopConfig>("/api/config/", {
        next: { revalidate: revalidateSeconds },
    });
}

/**
 * Fetch the current authenticated user. Returns 401 if not logged in.
 */
export async function apiCheckAuth() {

    return apiFetch<import("@/types").User>("/api/users/me/");
}

/**
 * Login with email and password. Sets HttpOnly cookies server-side.
 */
export async function apiLogin(email: string, password: string) {
    return apiFetch<unknown>("/api/auth/login/", {
        method: "POST",
        body: JSON.stringify({ email, password }),
    });
}

/**
 * Register a new user account.
 */
export async function apiRegister(data: {
    email: string;
    password: string;
    password_confirm: string;
    username?: string;
    first_name?: string;
    last_name?: string;
}) {
    return apiFetch<{ message: string }>("/api/auth/register/", {
        method: "POST",
        body: JSON.stringify(data),
    });
}

/**
 * Get current user's orders (paginated list).
 */
export async function getOrders(page = 1, pageSize = 20) {
    return apiFetch<{
        count: number;
        next: string | null;
        previous: string | null;
        results: import("@/types").Order[];
    }>(`/api/orders/?page=${page}&page_size=${pageSize}`);
}

/**
 * Logout and clear server-side cookies.
 */
export async function apiLogout() {
    return apiFetch<unknown>("/api/auth/logout/", {
        method: "POST",
    });
}

/**
 * Request password reset: sends recovery email.
 * SECURITY: Always returns success message (does not reveal if email exists).
 */
export async function apiRequestPasswordReset(email: string) {
    return apiFetch<{ detail: string }>("/api/auth/password-reset/", {
        method: "POST",
        body: JSON.stringify({ email }),
    });
}

/**
 * Confirm password reset: validates token and sets new password.
 * SECURITY: POST only, token is single-use, expires after 30 minutes.
 */
export async function apiConfirmPasswordReset(token: string, newPassword: string) {
    return apiFetch<{ detail: string }>("/api/auth/password-reset/confirm/", {
        method: "POST",
        body: JSON.stringify({
            token,
            new_password: newPassword,
        }),
    });
}

/**
 * Fetch all categories.
 */
export async function getCategories() {
    const response = await apiFetch<
        import("@/types").Category[] | { results: import("@/types").Category[] }
    >("/api/categories/", {
        next: { revalidate: 3600 },
        method: "GET",
    });

    // Handle both array and paginated responses
    if (Array.isArray(response)) {
        return response;
    }

    // Handle paginated response format
    if (response && typeof response === "object" && "results" in response) {
        return (response as { results: import("@/types").Category[] }).results;
    }

    // Fallback to empty array if response is invalid
    return [];
}

/**
 * Fetch products list with optional pagination and filters.
 */
export async function getProducts(
    page = 1,
    pageSize = 20,
    filters?: {
        search?: string;
        category?: string;
        min_price?: string;
        max_price?: string;
        ordering?: string;
    }
) {
    const params = new URLSearchParams({
        page: page.toString(),
        page_size: pageSize.toString(),
    });

    if (filters?.search) params.set("search", filters.search);
    if (filters?.category) params.set("category", filters.category);
    if (filters?.min_price) params.set("min_price", filters.min_price);
    if (filters?.max_price) params.set("max_price", filters.max_price);
    if (filters?.ordering) params.set("ordering", filters.ordering);

    return apiFetch<{
        count: number;
        next: string | null;
        previous: string | null;
        results: import("@/types").ProductListItem[];
    }>(`/api/products/?${params.toString()}`, {
        next: { revalidate: 60 },
        method: "GET",
    });
}

/**
 * Fetch a single product by slug.
 */
export async function getProductBySlug(slug: string) {
    return apiFetch<import("@/types").Product>(`/api/products/${slug}/`, {
        next: { revalidate: 60 },
    });
}

/**
 * Fetch featured products for home (max 4 with intelligent fallback).
 */
export async function getFeaturedProducts() {
    return apiFetch<import("@/types").ProductListItem[]>("/api/products/featured/", {
        next: { revalidate: 60 },
        method: "GET",
    });
}

/**
 * Create an order with cart items and shipping address.
 */
export async function createOrder(orderData: {
    items: Array<{ variant_id: number; quantity: number }>;
    shipping_address_data: {
        street: string;
        number: string;
        city: string;
        state: string;
        postal_code: string;
        country: string;
        additional_info?: string;
    };
    payment_method: string;
}) {
    return apiFetch<{ id: number; order_number: string; status: string }>("/api/orders/", {
        method: "POST",
        body: JSON.stringify(orderData),
    });
}

/**
 * Generate Mercado Pago payment preference for an order.
 * Returns init_point URL to redirect user to MP checkout.
 */
export async function createPaymentPreference(orderId: number) {
    return apiFetch<{
        order_id: number;
        init_point: string;
        preference_id: string;
    }>(`/api/orders/${orderId}/payment_preference/`, {
        method: "POST",
    });
}

/**
 * Get order details by ID.
 */
export async function getOrderById(orderId: number | string) {
    return apiFetch<import("@/types").Order>(`/api/orders/${orderId}/`);
}
