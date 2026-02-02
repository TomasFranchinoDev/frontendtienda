'use client';

import { useState } from 'react';
import Image from 'next/image';
import { VariantSelector } from '@/components/VariantSelector';
import { resolveMediaUrl } from '@/lib/media';
import { useCartStore } from '@/stores/useCartStore';
import { ShoppingCart, Check } from 'lucide-react';
import type { ProductVariant, ProductDetail } from '@/types';

interface ProductDetailClientProps {
    product: ProductDetail;
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
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
            </div>
        </div>
    );
}
