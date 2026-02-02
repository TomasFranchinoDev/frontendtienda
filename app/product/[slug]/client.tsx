'use client';

import { useState } from 'react';
import Image from 'next/image';
import { VariantSelector } from '@/components/VariantSelector';
import { useCartStore } from '@/stores/useCartStore';
import type { Product, ProductVariant } from '@/types';

interface ProductDetailClientProps {
    product: Product;
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
    const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [addedNotification, setAddedNotification] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const { addItem, items } = useCartStore();

    // Get cover image or first image
    const coverImage = product.images.find((img) => img.is_cover) || product.images[0];

    // Get the currently displayed image
    const displayedImage = product.images[selectedImageIndex] || coverImage;

    // Calculate total quantity in cart for this variant
    const getCartQuantityForVariant = (variantId: number): number => {
        const cartItem = items.find((item) => item.variantId === variantId);
        return cartItem ? cartItem.quantity : 0;
    };

    const canAddToCart = selectedVariant && selectedVariant.stock > 0 && !isAdding && quantity > 0 && quantity <= selectedVariant.stock;

    const handleAddToCart = () => {
        if (!selectedVariant) {
            alert('Por favor selecciona una variante');
            return;
        }

        // Get current quantity in cart for this variant
        const currentCartQuantity = getCartQuantityForVariant(selectedVariant.id);
        const totalQuantity = currentCartQuantity + quantity;

        // Validate stock considering what's already in the cart
        if (totalQuantity > selectedVariant.stock) {
            const availableToAdd = Math.max(0, selectedVariant.stock - currentCartQuantity);
            alert(
                `No hay suficiente stock. Ya tienes ${currentCartQuantity} en el carrito. ` +
                `Puedes agregar máximo ${availableToAdd} más. Stock total disponible: ${selectedVariant.stock}`
            );
            return;
        }

        if (quantity <= 0) {
            alert('La cantidad debe ser mayor a 0');
            return;
        }

        setIsAdding(true);

        addItem({
            variantId: selectedVariant.id,
            productId: product.id,
            productName: product.name,
            productSlug: product.slug,
            variantSku: selectedVariant.sku,
            price: selectedVariant.price,
            quantity,
            attributes: selectedVariant.attributes,
            thumbnail: coverImage?.image || coverImage?.image_url || undefined,
        });

        // Show notification
        setAddedNotification(true);
        setTimeout(() => setAddedNotification(false), 2000);

        // Reset quantity and button state
        setQuantity(1);
        setIsAdding(false);
    };

    return (
        <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                {/* Image Gallery */}
                <div className="space-y-4">
                    {displayedImage && (
                        <div className="relative aspect-square w-full overflow-hidden rounded-lg border border-border bg-muted">
                            <Image
                                src={displayedImage.image || displayedImage.image_url || ''}
                                alt={displayedImage.alt_text || product.name}
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                priority
                            />
                        </div>
                    )}

                    {/* Thumbnail Gallery */}
                    {product.images.length > 1 && (
                        <div className="flex gap-2 overflow-x-auto">
                            {product.images.map((image, index) => (
                                <button
                                    key={image.id}
                                    onClick={() => setSelectedImageIndex(index)}
                                    className={`h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border-2 transition-all ${index === selectedImageIndex
                                            ? 'border-gray-700 dark:border-gray-500 ring-2 ring-gray-700 dark:ring-gray-500'
                                            : 'border-border hover:border-gray-400 dark:hover:border-gray-600'
                                        }`}
                                >
                                    <Image
                                        src={image.image || image.image_url || ''}
                                        alt={image.alt_text}
                                        width={80}
                                        height={80}
                                        className="h-full w-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Product Info */}
                <div className="space-y-6">
                    {/* Header */}
                    <div>
                        <p className="text-sm text-muted-foreground">{product.category.name}</p>
                        <h1 className="text-3xl font-bold text-foreground">{product.name}</h1>
                    </div>

                    {/* Description */}
                    {product.description && (
                        <div className="prose prose-sm max-w-none text-foreground">
                            <p>{product.description}</p>
                        </div>
                    )}

                    {/* Variant Selector */}
                    {product.variants.length > 0 && (
                        <VariantSelector variants={product.variants} onVariantSelect={setSelectedVariant} />
                    )}

                    {/* Quantity Selector */}
                    {selectedVariant && (
                        <div className="rounded-lg border border-border bg-card p-4">
                            <label className="block text-sm font-medium text-card-foreground mb-2">
                                Cantidad
                            </label>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="rounded border border-border px-3 py-2 hover:bg-muted"
                                >
                                    −
                                </button>
                                <input
                                    type="number"
                                    min="1"
                                    max={selectedVariant.stock}
                                    value={quantity}
                                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                    className="w-16 rounded border border-border bg-background px-2 py-2 text-center"
                                />
                                <button
                                    onClick={() => setQuantity(Math.min(selectedVariant.stock, quantity + 1))}
                                    className="rounded border border-border px-3 py-2 hover:bg-muted"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Add to Cart */}
                    <div className="space-y-2">
                        <button
                            onClick={handleAddToCart}
                            disabled={!canAddToCart}
                            className={`w-full rounded-lg px-6 py-3 font-semibold transition-colors ${canAddToCart
                                ? 'bg-gray-700 dark:bg-gray-600 text-white hover:bg-gray-800 dark:hover:bg-gray-700'
                                : 'cursor-not-allowed bg-muted text-muted-foreground'
                                }`}
                        >
                            {!selectedVariant
                                ? 'Selecciona una variante'
                                : selectedVariant.stock > 0
                                    ? 'Agregar al carrito'
                                    : 'Agotado'}
                        </button>

                        {addedNotification && (
                            <div className="rounded-md border border-green-600/50 bg-green-50/10 p-3 text-sm text-green-600">
                                ✓ Producto agregado al carrito
                            </div>
                        )}
                    </div>

                    {/* SEO Info */}
                    {product.seo_title && (
                        <div className="space-y-2 rounded-md border border-border/50 bg-muted/30 p-4 text-sm">
                            {product.seo_title && (
                                <p>
                                    <span className="font-semibold">Título:</span> {product.seo_title}
                                </p>
                            )}
                            {product.seo_description && (
                                <p>
                                    <span className="font-semibold">Descripción:</span> {product.seo_description}
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
