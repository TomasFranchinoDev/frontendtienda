'use client';

import { useEffect, useRef, useState, useTransition } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { getMoreProducts, type ProductFilters } from '@/actions/product-actions';
import type { ProductListItem } from '@/types';
import { Loader2 } from 'lucide-react';

interface ProductInfiniteGridProps {
    initialProducts: ProductListItem[];
    initialHasMore: boolean;
    totalCount: number;
    filters: ProductFilters;
}

export default function ProductInfiniteGrid({
    initialProducts,
    initialHasMore,
    totalCount,
    filters,
}: ProductInfiniteGridProps) {
    const [products, setProducts] = useState<ProductListItem[]>(initialProducts);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(initialHasMore);
    const [isPending, startTransition] = useTransition();

    // Track the serialized filters to detect changes
    const filtersKey = JSON.stringify(filters);
    const prevFiltersKey = useRef(filtersKey);

    // Reset state when filters change (new searchParams from the server)
    useEffect(() => {
        if (prevFiltersKey.current !== filtersKey) {
            prevFiltersKey.current = filtersKey;
            setProducts(initialProducts);
            setPage(1);
            setHasMore(initialHasMore);
        }
    }, [filtersKey, initialProducts, initialHasMore]);

    const loadMore = () => {
        const nextPage = page + 1;

        startTransition(async () => {
            const result = await getMoreProducts(nextPage, filters);

            setProducts((prev) => [...prev, ...result.products]);
            setPage(nextPage);
            setHasMore(result.hasMore);
        });
    };

    return (
        <>
            {/* Results count + sorter are handled by the parent */}
            <div className="grid auto-rows-max grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {products.length === 0 && (
                <div className="flex min-h-96 flex-col items-center justify-center rounded-lg border border-border bg-card/50 p-8 text-center">
                    <p className="text-lg font-medium text-foreground">
                        No se encontraron productos
                    </p>
                    <p className="mt-2 text-muted-foreground">
                        Prueba ajustando tus filtros de búsqueda
                    </p>
                </div>
            )}

            {/* Load More button */}
            {hasMore && products.length > 0 && (
                <div className="mt-12 flex justify-center">
                    <button
                        onClick={loadMore}
                        disabled={isPending}
                        className="inline-flex items-center gap-2 rounded-lg border border-gray-700 px-6 py-3 font-semibold text-gray-700 transition-all hover:bg-gray-700 hover:text-white disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600"
                    >
                        {isPending ? (
                            <>
                                <Loader2 className="h-5 w-5 animate-spin" />
                                Cargando...
                            </>
                        ) : (
                            'Cargar más productos'
                        )}
                    </button>
                </div>
            )}

            {/* "All loaded" indicator */}
            {!hasMore && products.length > 0 && (
                <p className="mt-12 text-center text-sm text-muted-foreground">
                    Mostrando los {products.length} de {totalCount} productos
                </p>
            )}
        </>
    );
}
