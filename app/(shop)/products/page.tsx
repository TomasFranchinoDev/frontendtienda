import { Suspense } from 'react';
import { getProducts, getCategories } from '@/lib/api';
import FiltersContainer from '@/components/products/filters-container';
import SearchInput from '@/components/products/search-input';
import ProductSorter from '@/components/products/product-sorter';
import ProductInfiniteGrid from '@/components/products/product-infinite-grid';
import type { ProductFilters } from '@/actions/product-actions';

interface PageProps {
    searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export const metadata = {
    title: 'Catálogo de Productos',
    description: 'Explora nuestro catálogo completo de productos',
};

async function ProductsGridLoader({
    filters,
}: {
    filters: ProductFilters;
}) {
    try {
        const data = await getProducts(1, 20, {
            search: filters.search,
            category: filters.category,
            min_price: filters.min_price,
            max_price: filters.max_price,
            ordering: filters.ordering,
        });

        return (
            <>
                <div className="mb-6 flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                        Se encontraron <span className="font-semibold text-foreground">{data.count}</span> productos
                    </div>
                    <ProductSorter />
                </div>

                <ProductInfiniteGrid
                    initialProducts={data.results ?? []}
                    initialHasMore={data.next !== null}
                    totalCount={data.count}
                    filters={filters}
                />
            </>
        );
    } catch (error) {
        console.error('Error fetching products:', error);
        return (
            <div className="flex min-h-96 items-center justify-center rounded-lg border border-destructive/20 bg-destructive/5">
                <p className="text-lg text-destructive">Error al cargar los productos</p>
            </div>
        );
    }
}

function ProductsGridSkeleton() {
    return (
        <div className="grid auto-rows-max grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="animate-pulse rounded-lg border border-border bg-card p-4">
                    <div className="aspect-square w-full rounded-md bg-muted" />
                    <div className="mt-4 h-4 w-3/4 rounded bg-muted" />
                    <div className="mt-2 h-3 w-1/2 rounded bg-muted" />
                </div>
            ))}
        </div>
    );
}

export default async function ProductsPage({ searchParams }: PageProps) {
    const params = await searchParams;

    // Extract filters (page param is no longer needed)
    const filters: ProductFilters = {
        search: typeof params.search === 'string' ? params.search : undefined,
        category: typeof params.category === 'string' ? params.category : undefined,
        min_price: typeof params.min_price === 'string' ? params.min_price : undefined,
        max_price: typeof params.max_price === 'string' ? params.max_price : undefined,
        ordering: typeof params.ordering === 'string' ? params.ordering : undefined,
    };

    // Fetch categories for sidebar
    const categories = await getCategories();

    return (
        <div className="w-full bg-zinc-50 dark:bg-black">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Header & Search */}
                <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">Catálogo</h1>
                        <p className="text-muted-foreground mt-1">
                            {categories.length} categorías disponibles
                        </p>
                    </div>
                    <div className="w-full md:w-72">
                        <SearchInput placeholder="Buscar productos..." />
                    </div>
                </div>

                <div className="flex flex-col gap-8 lg:flex-row">
                    {/* Sidebar Filters */}
                    <FiltersContainer categories={categories} />

                    {/* Main Content */}
                    <main className="flex-1">
                        <Suspense fallback={<ProductsGridSkeleton />}>
                            <ProductsGridLoader filters={filters} />
                        </Suspense>
                    </main>
                </div>
            </div>
        </div>
    );
}
