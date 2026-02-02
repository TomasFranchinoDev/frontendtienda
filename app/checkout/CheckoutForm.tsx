'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createOrder, createPaymentPreference } from '@/lib/api';
import { useCartStore } from '@/stores/useCartStore';
import { useAuthStore } from '@/stores/useAuthStore';

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    streetAddress: string;
    streetNumber: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
}

const initialFormData: FormData = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    streetAddress: '',
    streetNumber: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'Argentina',
};

export function CheckoutForm() {
    const router = useRouter();
    const { items, clearCart } = useCartStore();
    const { user } = useAuthStore();
    const [formData, setFormData] = useState<FormData>({
        ...initialFormData,
        firstName: user?.first_name || '',
        lastName: user?.last_name || '',
        email: user?.email || '',
        phoneNumber: user?.phone_number || '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const validateForm = (): boolean => {
        if (!formData.firstName.trim()) {
            setError('El nombre es requerido');
            return false;
        }
        if (!formData.lastName.trim()) {
            setError('El apellido es requerido');
            return false;
        }
        if (!formData.email.trim()) {
            setError('El email es requerido');
            return false;
        }
        if (!formData.phoneNumber.trim()) {
            setError('El teléfono es requerido');
            return false;
        }
        if (!formData.streetAddress.trim()) {
            setError('La dirección es requerida');
            return false;
        }
        if (!formData.streetNumber.trim()) {
            setError('El número de la calle es requerido');
            return false;
        }
        if (!formData.city.trim()) {
            setError('La ciudad es requerida');
            return false;
        }
        if (!formData.state.trim()) {
            setError('La provincia es requerida');
            return false;
        }
        if (!formData.postalCode.trim()) {
            setError('El código postal es requerido');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            const orderData = {
                items: items.map((item) => ({
                    variant_id: item.variantId,
                    quantity: item.quantity,
                })),
                shipping_address_data: {
                    street: formData.streetAddress,
                    number: formData.streetNumber,
                    city: formData.city,
                    state: formData.state,
                    postal_code: formData.postalCode,
                    country: formData.country,
                    additional_info: `${formData.firstName} ${formData.lastName} | ${formData.phoneNumber} | ${formData.email}`,
                },
                payment_method: 'mercado_pago',
            };

            // Step 1: Create order
            const order = await createOrder(orderData);

            // Step 2: Generate payment preference
            const paymentPreference = await createPaymentPreference(order.id);

            // Step 3: Clear cart before redirecting
            clearCart();

            // Step 4: Redirect to Mercado Pago checkout
            window.location.href = paymentPreference.init_point;
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Error al crear la orden';
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {error && (
                <div className="rounded-md border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
                    {error}
                </div>
            )}

            {/* Personal Information */}
            <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="mb-4 text-lg font-semibold text-card-foreground">Información Personal</h3>

                <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-card-foreground mb-1">
                            Nombre *
                        </label>
                        <input
                            id="firstName"
                            name="firstName"
                            type="text"
                            value={formData.firstName}
                            onChange={handleChange}
                            disabled={loading}
                            required
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
                        />
                    </div>

                    <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-card-foreground mb-1">
                            Apellido *
                        </label>
                        <input
                            id="lastName"
                            name="lastName"
                            type="text"
                            value={formData.lastName}
                            onChange={handleChange}
                            disabled={loading}
                            required
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-card-foreground mb-1">
                            Email *
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            disabled={loading}
                            required
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
                        />
                    </div>

                    <div>
                        <label htmlFor="phoneNumber" className="block text-sm font-medium text-card-foreground mb-1">
                            Teléfono *
                        </label>
                        <input
                            id="phoneNumber"
                            name="phoneNumber"
                            type="tel"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            disabled={loading}
                            required
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
                        />
                    </div>
                </div>
            </div>

            {/* Shipping Address */}
            <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="mb-4 text-lg font-semibold text-card-foreground">Dirección de Envío</h3>

                <div className="space-y-4">
                    <div>
                        <label htmlFor="streetAddress" className="block text-sm font-medium text-card-foreground mb-1">
                            Calle *
                        </label>
                        <input
                            id="streetAddress"
                            name="streetAddress"
                            type="text"
                            value={formData.streetAddress}
                            onChange={handleChange}
                            disabled={loading}
                            required
                            placeholder="Nombre de la calle"
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
                        />
                    </div>

                    <div>
                        <label htmlFor="streetNumber" className="block text-sm font-medium text-card-foreground mb-1">
                            Número *
                        </label>
                        <input
                            id="streetNumber"
                            name="streetNumber"
                            type="text"
                            value={formData.streetNumber}
                            onChange={handleChange}
                            disabled={loading}
                            required
                            placeholder="Altura/Número"
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
                        />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                            <label htmlFor="city" className="block text-sm font-medium text-card-foreground mb-1">
                                Ciudad *
                            </label>
                            <input
                                id="city"
                                name="city"
                                type="text"
                                value={formData.city}
                                onChange={handleChange}
                                disabled={loading}
                                required
                                className="w-full rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
                            />
                        </div>

                        <div>
                            <label htmlFor="state" className="block text-sm font-medium text-card-foreground mb-1">
                                Provincia *
                            </label>
                            <input
                                id="state"
                                name="state"
                                type="text"
                                value={formData.state}
                                onChange={handleChange}
                                disabled={loading}
                                required
                                className="w-full rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
                            />
                        </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                            <label htmlFor="postalCode" className="block text-sm font-medium text-card-foreground mb-1">
                                Código Postal *
                            </label>
                            <input
                                id="postalCode"
                                name="postalCode"
                                type="text"
                                value={formData.postalCode}
                                onChange={handleChange}
                                disabled={loading}
                                required
                                className="w-full rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
                            />
                        </div>

                        <div>
                            <label htmlFor="country" className="block text-sm font-medium text-card-foreground mb-1">
                                País *
                            </label>
                            <select
                                id="country"
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                disabled={loading}
                                className="w-full rounded-md border border-input bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
                            >
                                <option value="Argentina">Argentina</option>
                                <option value="Chile">Chile</option>
                                <option value="Colombia">Colombia</option>
                                <option value="Mexico">México</option>
                                <option value="Peru">Perú</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={loading}
                className={`w-full rounded-lg px-6 py-3 font-semibold transition-colors ${loading
                    ? 'cursor-not-allowed bg-gray-300 text-gray-500'
                    : 'bg-gray-700 text-white hover:bg-gray-800'
                    }`}
            >
                {loading ? 'Redirigiendo a Mercado Pago...' : 'Proceder al Pago'}
            </button>
        </form>
    );
}
