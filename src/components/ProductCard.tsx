'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { ProductListItem } from '@/types';
import { resolveMediaUrl } from '@/lib/media';
export function ProductCard({ product }: { product: ProductListItem }) {
    const formattedPrice = product.price_start
        ? new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(
            parseFloat(product.price_start),
        )
        : 'Consultar precio';
    const thumbnailUrl = resolveMediaUrl(product.thumbnail);
    return (
        <Link href={`/product/${product.slug}`}>
            <div className="group flex h-96 lg:h-80 cursor-pointer flex-col overflow-hidden rounded-lg border border-border bg-card transition-all hover:shadow-lg">
                {/* Image Container */}
                <div className="relative h-56 lg:h-48 w-full overflow-hidden bg-muted flex-shrink-0">
                    {product.thumbnail ? (
                        <Image
                            src={thumbnailUrl || ''}
                            alt={product.name}
                            fill
                            className="object-cover transition-transform group-hover:scale-105"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center bg-gradient-to-br from-muted to-muted-foreground/20">
                            <span className="text-sm text-muted-foreground">Sin imagen</span>
                        </div>
                    )}
                </div>

                {/* Content Container */}
                <div className="flex flex-1 flex-col justify-between overflow-hidden p-4">
                    <div className="flex-1 overflow-hidden">
                        <h3 className="line-clamp-2 text-sm font-semibold text-card-foreground hover:text-primary">
                            {product.name}
                        </h3>
                        {product.has_variants && (
                            <p className="mt-1 text-xs text-muted-foreground line-clamp-1">
                                {product.has_variants ? 'Múltiples variantes' : ''}
                            </p>
                        )}
                    </div>

                    {/* Price */}
                    <div className="mt-3 flex items-baseline justify-between flex-shrink-0">
                        <span className="text-lg font-bold text-primary">{formattedPrice}</span>
                    </div>
                    <div className="mt-3 flex items-baseline justify-between flex-shrink-0">
                        {product.price_start && <span className="text-xs text-muted-foreground">3 cuotas sin interés de ${Number(parseFloat(product.price_start) / 3).toFixed(2)}</span>}
                    </div>
                </div>
            </div>
        </Link>
    );
}
