import { Suspense } from 'react';
import Link from 'next/link';
import { getProducts, getCategories } from '@/lib/api';
import { ProductCard } from '@/components/ProductCard';
import FiltersContainer from '@/components/products/filters-container';
import SearchInput from '@/components/products/search-input';
import ProductSorter from '@/components/products/product-sorter';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PageProps {
    searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export const metadata = {
    title: 'Catálogo de Productos',
    description: 'Explora nuestro catálogo completo de productos',
};

async function ProductsGrid({
    page,
    search,
    category,
    minPrice,
    maxPrice,
    ordering
}: {
    page: number;
    search?: string;
    category?: string;
    minPrice?: string;
    maxPrice?: string;
    ordering?: string;
}) {
    try {
        const data = await getProducts(page, 20, {
            search,
            category,
            min_price: minPrice,
            max_price: maxPrice,
            ordering,
        });

        if (!data.results || data.results.length === 0) {
            return (
                <div className="flex min-h-96 flex-col items-center justify-center rounded-lg border border-border bg-card/50 p-8 text-center">
                    <p className="text-lg font-medium text-foreground">No se encontraron productos</p>
                    <p className="mt-2 text-muted-foreground">Prueba ajustando tus filtros de búsqueda</p>
                </div>
            );
        }

        return (
            <>
                <div className="mb-6 flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                        Se encontraron <span className="font-semibold text-foreground">{data.count}</span> productos
                    </div>
                    <ProductSorter />
                </div>

                <div className="grid auto-rows-max grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {data.results.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                {/* Pagination Controls */}
                <div className="mt-12 flex items-center justify-center gap-4">
                    <Link
                        href={{
                            query: {
                                page: page > 1 ? page - 1 : 1,
                                search,
                                category,
                                min_price: minPrice,
                                max_price: maxPrice,
                                ordering
                            }
                        }}
                        passHref
                        legacyBehavior={false}
                    >
                        <button
                            disabled={page === 1}
                            className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 font-semibold transition-all ${page === 1
                                ? 'cursor-not-allowed bg-muted text-muted-foreground opacity-50'
                                : 'border border-gray-700 dark:border-gray-600 bg-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-700 dark:hover:bg-gray-600 hover:text-white'
                                }`}
                        >
                            <ChevronLeft className="h-5 w-5" />
                            Anterior
                        </button>
                    </Link>

                    <span className="text-sm text-muted-foreground">
                        Página <span className="font-semibold text-foreground">{page}</span>
                    </span>

                    <Link
                        href={{
                            query: {
                                page: data.next ? page + 1 : page,
                                search,
                                category,
                                min_price: minPrice,
                                max_price: maxPrice,
                                ordering
                            }
                        }}
                        passHref
                        legacyBehavior={false}
                    >
                        <button
                            disabled={!data.next}
                            className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 font-semibold transition-all ${!data.next
                                ? 'cursor-not-allowed bg-muted text-muted-foreground opacity-50'
                                : 'border border-gray-700 dark:border-gray-600 bg-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-700 dark:hover:bg-gray-600 hover:text-white'
                                }`}
                        >
                            Siguiente
                            <ChevronRight className="h-5 w-5" />
                        </button>
                    </Link>
                </div>
            </>
        );
    } catch (error) {
        console.error('Error fetching products:');
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
    const page = typeof params.page === 'string' ? parseInt(params.page, 10) : 1;
    const validPage = Math.max(1, isNaN(page) ? 1 : page);

    // Extract filters
    const search = typeof params.search === 'string' ? params.search : undefined;
    const category = typeof params.category === 'string' ? params.category : undefined;
    const minPrice = typeof params.min_price === 'string' ? params.min_price : undefined;
    const maxPrice = typeof params.max_price === 'string' ? params.max_price : undefined;
    const ordering = typeof params.ordering === 'string' ? params.ordering : undefined;

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
                            <ProductsGrid
                                page={validPage}
                                search={search}
                                category={category}
                                minPrice={minPrice}
                                maxPrice={maxPrice}
                                ordering={ordering}
                            />
                        </Suspense>
                    </main>
                </div>
            </div>
        </div>
    );
}
