'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import type { Category } from '@/types';
import { useDebouncedCallback } from 'use-debounce';
import { CategoryTree } from '@/components/CategoryTree';

export default function ProductFilters({ categories }: { categories: Category[] }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Initialize state from URL
    const initialMin = searchParams.get('min_price') ?? '';
    const initialMax = searchParams.get('max_price') ?? '';

    const [minPrice, setMinPrice] = useState(initialMin);
    const [maxPrice, setMaxPrice] = useState(initialMax);

    // Debounce the URL update for price sliders/inputs
    const debouncedPriceUpdate = useDebouncedCallback((min: string, max: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (min) params.set('min_price', min);
        else params.delete('min_price');

        if (max) params.set('max_price', max);
        else params.delete('max_price');

        params.delete('page'); // Reset pagination

        router.push(`?${params.toString()}`, { scroll: false });
    }, 500);

    // Handle Category Click
    const handleCategoryChange = (slug: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (slug) {
            params.set('category', slug);
        } else {
            params.delete('category');
        }

        params.delete('page');
        router.push(`?${params.toString()}`, { scroll: false });
    };

    // Sync state if URL changes externally (e.g. back button)
    useEffect(() => {
        setMinPrice(searchParams.get('min_price') ?? '');
        setMaxPrice(searchParams.get('max_price') ?? '');
    }, [searchParams]);

    const currentCategory = searchParams.get('category');

    return (
        <div className="space-y-8">
            {/* Categories Tree */}
            <CategoryTree
                onSelectCategory={handleCategoryChange}
                selectedCategory={currentCategory}
                categories={categories}
            />

            {/* Price Range */}
            <div>
                <h3 className="text-sm font-medium tracking-wide text-foreground uppercase">Precio</h3>
                <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-xs text-muted-foreground">Mínimo</label>
                        <input
                            type="number"
                            value={minPrice}
                            onChange={(e) => {
                                setMinPrice(e.target.value);
                                debouncedPriceUpdate(e.target.value, maxPrice);
                            }}
                            className="mt-1 block w-full rounded-md border-input bg-background text-foreground shadow-sm focus:border-ring focus:ring-ring sm:text-sm p-2 border"
                            placeholder="$0"
                        />
                    </div>
                    <div>
                        <label className="text-xs text-muted-foreground">Máximo</label>
                        <input
                            type="number"
                            value={maxPrice}
                            onChange={(e) => {
                                setMaxPrice(e.target.value);
                                debouncedPriceUpdate(minPrice, e.target.value);
                            }}
                            className="mt-1 block w-full rounded-md border-input bg-background text-foreground shadow-sm focus:border-ring focus:ring-ring sm:text-sm p-2 border"
                            placeholder="$Max"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

