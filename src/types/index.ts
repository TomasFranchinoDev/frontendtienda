export interface ShopConfig {
    id?: number
    site_name: string
    primary_color: string
    secondary_color: string
    logo_url?: string | null
    social_links: Record<string, string>
    contact_email?: string | null
    mp_public_key?: string | null
}

export interface Category {
    id: number
    name: string
    slug: string
    image_url?: string | null
    parent_id?: number | null
    children?: Category[]
}

export interface ProductImage {
    id: number
    image: string
    image_url?: string | null
    alt_text: string
    is_cover: boolean
}

export interface ProductVariant {
    id: number
    sku: string
    price: string
    stock: number
    attributes: Record<string, string>
    is_default: boolean
}

export interface ProductListItem {
    id: number
    name: string
    slug: string
    category: string
    price_start: string | null
    thumbnail: string | null
    has_variants: boolean
}

export interface ProductDetail {
    id: number
    name: string
    slug: string
    description: string
    category: Category
    seo_title: string
    seo_description: string
    variants: ProductVariant[]
    images: ProductImage[]
    price_start: string | null
    has_variants: boolean
}

export type Product = ProductDetail

export interface User {
    id: number
    email: string
    username?: string
    first_name?: string
    last_name?: string
    phone_number?: string | null
    is_verified?: boolean
}

// Cart Types
export interface CartItem {
    variantId: number
    quantity: number
    productId: number
    productName: string
    productSlug: string
    variantSku: string
    price: string
    attributes: Record<string, string>
    thumbnail?: string | null
}

// Order Types
export type OrderStatus = 'pending' | 'paid' | 'cancelled' | 'refunded';

export interface OrderItem {
    variant_id: number;
    product_name: string;
    quantity: number;
    price: string;
}

export interface Order {
    id: number;
    order_number: string;
    status: OrderStatus;
    total: string;
    payment_id: string | null;
    created_at: string;
    updated_at: string;
    items: OrderItem[];
}
