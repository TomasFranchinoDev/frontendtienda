const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export function resolveMediaUrl(path?: string | null): string | null {
    if (!path) return null;
    if (path.startsWith('http')) return path;
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    return `${API_BASE_URL}${normalizedPath}`;
}
export function resolveLogoUrl(url?: string | null): string | null {
    if (!url) return null;
    if (url.startsWith('http')) return `/ecommerce.webp`;  // URL externa
    if (url.startsWith('/')) return `/${url}`;     // Ya tiene /
    return url;                         // Agrega /
}