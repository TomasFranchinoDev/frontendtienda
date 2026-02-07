'use server';

import { getProducts } from '@/lib/api';
import type { ProductListItem } from '@/types';

export interface ProductFilters {
    search?: string;
    category?: string;
    min_price?: string;
    max_price?: string;
    ordering?: string;
}

export interface GetMoreProductsResult {
    products: ProductListItem[];
    hasMore: boolean;
    totalCount: number;
}

/**
 * Server Action: fetches a page of products with the given filters.
 * Returns the products array, whether there are more pages, and the total count.
 */
export async function getMoreProducts(
    page: number,
    filters: ProductFilters
): Promise<GetMoreProductsResult> {
    const data = await getProducts(page, 20, {
        search: filters.search,
        category: filters.category,
        min_price: filters.min_price,
        max_price: filters.max_price,
        ordering: filters.ordering,
    });

    return {
        products: data.results,
        hasMore: data.next !== null,
        totalCount: data.count,
    };
}
