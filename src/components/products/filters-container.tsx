'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { SlidersHorizontal } from 'lucide-react';
import type { Category } from '@/types';
import ProductFilters from './product-filters';

export default function FiltersContainer({ categories }: { categories: Category[] }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <aside className="w-full lg:w-64 flex-shrink-0">
            {/* Mobile Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden w-full mb-4 flex items-center justify-between rounded-lg border border-border bg-card p-4 font-semibold transition-colors hover:bg-muted"
            >
                <div className="flex items-center gap-2">
                    <SlidersHorizontal className="h-4 w-4" />
                    <span>Filtros</span>
                </div>
                <ChevronDown
                    className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            {/* Filters Container */}
            <div
                className={`lg:sticky lg:top-24 rounded-lg border border-border bg-card p-6 shadow-sm overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen block' : 'hidden lg:block max-h-screen'
                    }`}
            >
                <div className="hidden lg:flex mb-4 items-center gap-2 pb-4 border-b border-border">
                    <SlidersHorizontal className="h-4 w-4" />
                    <h2 className="font-semibold">Filtros</h2>
                </div>
                <ProductFilters categories={categories} />
            </div>
        </aside>
    );
}
