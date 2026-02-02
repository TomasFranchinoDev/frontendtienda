'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Suspense } from 'react';
import { getProductBySlug } from '@/lib/api';
import { VariantSelector } from '@/components/VariantSelector';
import { resolveMediaUrl } from '@/lib/media';
import { useCartStore } from '@/stores/useCartStore';
import { ShoppingCart, Check } from 'lucide-react';
import type { ProductVariant, ProductDetail } from '@/types';

interface PageProps {
    params: Promise<{ slug: string }>;
}

async function ProductContent({ slug }: { slug: string }) {
    try {
        const product = await getProductBySlug(slug);

        if (!product) {
            return (
                <div className="flex min-h-screen items-center justify-center">
                    <p className="text-lg text-destructive">Producto no encontrado</p>
                </div>
            );
        }

        return <ProductDetailView product={product} />;
    } catch (error) {
        console.error('Error fetching product:');
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-lg text-destructive">Error al cargar el producto</p>
            </div>
        );
    }
}

interface ProductDetailViewProps {
    product: ProductDetail;
}

function ProductDetailView({ product }: ProductDetailViewProps) {
    const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [addedToCart, setAddedToCart] = useState(false);
    const addItem = useCartStore((state) => state.addItem);

    // Get primary image or first image
    const primaryImage = product.images?.find((img) => img.is_cover) || product.images?.[0];
    const thumbnailImages = product.images?.filter((img) => !img.is_cover) || [];

    const isInStock = selectedVariant ? selectedVariant.stock > 0 : product.variants?.[0]?.stock > 0;

    const handleAddToCart = () => {
        const variant = selectedVariant || product.variants?.[0];
        if (!variant) return;

        addItem({
            variantId: variant.id,
            quantity,
            productId: product.id,
            productName: product.name,
            productSlug: product.slug,
            variantSku: variant.sku,
            price: variant.price,
            attributes: variant.attributes,
            thumbnail: product.images?.[0]?.image,
        });

        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 2000);
    };

    return (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Left Column: Gallery */}
            <div className="space-y-4">
                {/* Main Image */}
                <div className="relative aspect-square w-full overflow-hidden rounded-lg border border-border bg-muted">
                    {primaryImage ? (
                        <Image
                            src={resolveMediaUrl(primaryImage.image) || ''}
                            alt={primaryImage.alt_text || product.name}
                            fill
                            className="object-cover"
                            priority
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center bg-gradient-to-br from-muted to-muted-foreground/20">
                            <span className="text-sm text-muted-foreground">Sin imagen</span>
                        </div>
                    )}
                </div>

                {/* Thumbnail Grid */}
                {thumbnailImages.length > 0 && (
                    <div className="grid grid-cols-4 gap-2">
                        {thumbnailImages.map((img, idx) => (
                            <button
                                key={idx}
                                className="relative aspect-square overflow-hidden rounded-md border-2 border-transparent transition-all hover:border-primary"
                            >
                                <Image
                                    src={resolveMediaUrl(img.image) || ''}
                                    alt={img.alt_text || `${product.name} - imagen ${idx + 1}`}
                                    fill
                                    className="object-cover"
                                />
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Right Column: Product Info */}
            <div className="space-y-6">
                {/* Category */}
                {product.category && (
                    <div className="text-sm text-muted-foreground">{product.category.name}</div>
                )}

                {/* Title */}
                <div>
                    <h1 className="text-4xl font-bold text-foreground">{product.name}</h1>
                </div>

                {/* Price */}
                <div>
                    {selectedVariant ? (
                        <span className="text-3xl font-bold text-primary">
                            {new Intl.NumberFormat('es-AR', {
                                style: 'currency',
                                currency: 'ARS',
                            }).format(parseFloat(selectedVariant.price))}
                        </span>
                    ) : product.price_start ? (
                        <div className="text-3xl font-bold text-primary">
                            desde{' '}
                            {new Intl.NumberFormat('es-AR', {
                                style: 'currency',
                                currency: 'ARS',
                            }).format(parseFloat(product.price_start))}
                        </div>
                    ) : null}
                </div>

                {/* Description */}
                {product.description && (
                    <p className="text-muted-foreground">{product.description}</p>
                )}

                {/* Stock Status */}
                <div className="flex items-center gap-2">
                    {isInStock ? (
                        <>
                            <Check className="h-5 w-5 text-green-600" />
                            <span className="text-sm font-semibold text-green-600">
                                Disponible en stock
                            </span>
                        </>
                    ) : (
                        <span className="text-sm font-semibold text-destructive">
                            Agotado
                        </span>
                    )}
                </div>

                {/* Variant Selector */}
                {product.has_variants && product.variants.length > 0 && (
                    <VariantSelector
                        variants={product.variants}
                        onVariantSelect={setSelectedVariant}
                    />
                )}

                {/* Quantity Selector */}
                <div className="flex items-center gap-4">
                    <label htmlFor="quantity" className="text-sm font-medium text-foreground">
                        Cantidad:
                    </label>
                    <div className="flex items-center gap-2 rounded-lg border border-border">
                        <button
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="px-3 py-2 hover:bg-muted"
                        >
                            −
                        </button>
                        <input
                            id="quantity"
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))}
                            className="w-16 bg-transparent text-center"
                            min="1"
                        />
                        <button
                            onClick={() => setQuantity(quantity + 1)}
                            className="px-3 py-2 hover:bg-muted"
                        >
                            +
                        </button>
                    </div>
                </div>

                {/* Add to Cart Button */}
                <button
                    onClick={handleAddToCart}
                    disabled={!isInStock}
                    className={`w-full rounded-lg px-6 py-3 font-semibold transition-all ${addedToCart
                        ? 'bg-green-600 text-white'
                        : isInStock
                            ? 'bg-primary text-white hover:shadow-lg'
                            : 'cursor-not-allowed bg-muted text-muted-foreground opacity-50'
                        }`}
                >
                    {addedToCart ? (
                        <span className="flex items-center justify-center gap-2">
                            <Check className="h-5 w-5" />
                            Agregado al carrito
                        </span>
                    ) : (
                        <span className="flex items-center justify-center gap-2">
                            <ShoppingCart className="h-5 w-5" />
                            Agregar al carrito
                        </span>
                    )}
                </button>

                {/* SEO Meta */}
                {product.seo_title && (
                    <meta name="description" content={product.seo_description || ''} />
                )}
            </div>
        </div>
    );
}

export async function generateMetadata({ params }: PageProps) {
    const { slug } = await params;
    try {
        const product = await getProductBySlug(slug);
        return {
            title: product?.seo_title || product?.name,
            description: product?.seo_description || product?.description,
        };
    } catch {
        return {
            title: 'Producto',
            description: 'Detalle del producto',
        };
    }
}

export default async function ProductPage({ params }: PageProps) {
    const { slug } = await params;

    return (
        <div className="w-full">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <Suspense
                    fallback={
                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                            <div className="aspect-square animate-pulse rounded-lg border border-border bg-muted" />
                            <div className="space-y-4">
                                <div className="h-8 w-3/4 animate-pulse rounded bg-muted" />
                                <div className="h-10 w-1/2 animate-pulse rounded bg-muted" />
                                <div className="space-y-2">
                                    {Array.from({ length: 3 }).map((_, i) => (
                                        <div key={i} className="h-4 w-full animate-pulse rounded bg-muted" />
                                    ))}
                                </div>
                            </div>
                        </div>
                    }
                >
                    <ProductContent slug={slug} />
                </Suspense>
            </div>
        </div>
    );
}
