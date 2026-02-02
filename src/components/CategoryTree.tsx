'use client';

import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface Category {
    id: number;
    name: string;
    slug: string;
    parent_id: number | null;
    children?: Category[];
}

interface CategoryTreeProps {
    onSelectCategory: (slug: string) => void;
    selectedCategory: string | null;
    categories: Category[];
}

export function CategoryTree({ onSelectCategory, selectedCategory, categories }: CategoryTreeProps) {
    const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set());

    const toggleExpanded = (categoryId: number) => {
        setExpandedIds((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(categoryId)) {
                newSet.delete(categoryId);
            } else {
                newSet.add(categoryId);
            }
            return newSet;
        });
    };

    const handleSelectCategory = (slug: string) => {
        onSelectCategory(slug);
    };

    const handleClearSelection = () => {
        onSelectCategory('');
    };

    const CategoryItem = ({ category, level = 0 }: { category: Category; level?: number }) => {
        const isExpanded = expandedIds.has(category.id);
        const hasChildren = category.children && category.children.length > 0;
        const isSelected = selectedCategory === category.slug;

        return (
            <div key={category.id}>
                <div className="flex items-center gap-1">
                    {hasChildren ? (
                        <button
                            onClick={() => toggleExpanded(category.id)}
                            className="p-1 hover:bg-muted rounded"
                            aria-label={isExpanded ? 'Contraer' : 'Expandir'}
                        >
                            {isExpanded ? (
                                <ChevronDown className="h-4 w-4" />
                            ) : (
                                <ChevronRight className="h-4 w-4" />
                            )}
                        </button>
                    ) : (
                        <div className="w-6" />
                    )}

                    <button
                        onClick={() => handleSelectCategory(category.slug)}
                        className={`flex-1 text-left px-2 py-2 rounded text-sm transition-colors ${isSelected
                                ? 'bg-gray-700 dark:bg-gray-600 text-white font-medium'
                                : 'hover:bg-muted text-foreground'
                            }`}
                    >
                        {category.name}
                    </button>
                </div>

                {/* Children */}
                {hasChildren && isExpanded && (
                    <div className="ml-2 border-l border-border">
                        {category.children!.map((child) => (
                            <div key={child.id} className="pl-2">
                                <CategoryItem category={child} level={level + 1} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    // Filtrar solo las categorías raíz
    const rootCategories = categories.filter(cat => cat.parent_id === null || cat.parent_id === undefined);

    return (
        <div className="rounded-lg border border-border bg-card p-4 space-y-2">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-card-foreground">Categorías</h3>
                {selectedCategory && (
                    <button
                        onClick={handleClearSelection}
                        className="text-xs px-2 py-1 rounded border border-border hover:bg-muted transition-colors"
                    >
                        Limpiar
                    </button>
                )}
            </div>

            <div className="space-y-1">
                {rootCategories.length > 0 ? (
                    rootCategories.map((category) => (
                        <CategoryItem key={category.id} category={category} />
                    ))
                ) : (
                    <p className="text-sm text-muted-foreground p-2">
                        No hay categorías disponibles
                    </p>
                )}
            </div>
        </div>
    );
}
