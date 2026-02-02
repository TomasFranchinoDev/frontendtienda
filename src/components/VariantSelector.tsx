'use client';

import { useMemo, useState, useEffect } from 'react';
import type { ProductVariant } from '@/types';

interface VariantSelectorProps {
    variants: ProductVariant[];
    onVariantSelect: (variant: ProductVariant | null) => void;
}

export function VariantSelector({ variants, onVariantSelect }: VariantSelectorProps) {
    const [selectedAttributes, setSelectedAttributes] = useState<Record<string, string>>({});
    const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);

    // Extract all unique attribute keys and values
    const attributeOptions = useMemo(() => {
        const options: Record<string, Set<string>> = {};

        variants.forEach((variant) => {
            Object.entries(variant.attributes).forEach(([key, value]) => {
                if (!options[key]) {
                    options[key] = new Set();
                }
                options[key].add(value);
            });
        });

        // Convert sets to arrays
        const result: Record<string, string[]> = {};
        Object.entries(options).forEach(([key, set]) => {
            result[key] = Array.from(set).sort();
        });

        return result;
    }, [variants]);

    // Find matching variant when attributes change
    const matchingVariant = useMemo(() => {
        const attributeKeys = Object.keys(attributeOptions);

        // If no attributes selected, return null
        if (attributeKeys.length === 0 || Object.keys(selectedAttributes).length === 0) {
            return null;
        }

        // Check if user has selected all required attributes
        const hasAllAttributes = attributeKeys.every(
            (key) => selectedAttributes[key] !== undefined && selectedAttributes[key] !== '',
        );

        if (!hasAllAttributes) {
            return null;
        }

        // Find variant that matches all selected attributes
        const match = variants.find((variant) => {
            return attributeKeys.every(
                (key) => variant.attributes[key] === selectedAttributes[key],
            );
        });

        return match || null;
    }, [selectedAttributes, variants, attributeOptions]);

    // Update parent when matching variant changes
    useEffect(() => {
        setSelectedVariant(matchingVariant);
        onVariantSelect(matchingVariant);
    }, [matchingVariant, onVariantSelect]);

    const handleAttributeChange = (attributeKey: string, value: string) => {
        setSelectedAttributes((prev) => {
            // If clicking the same value, deselect it
            if (prev[attributeKey] === value) {
                const newAttrs = { ...prev };
                delete newAttrs[attributeKey];
                return newAttrs;
            }
            // Otherwise, select the new value
            return {
                ...prev,
                [attributeKey]: value,
            };
        });
    };

    // If no variants, don't render
    if (variants.length === 0) {
        return (
            <div className="rounded-md border border-destructive/50 bg-destructive/10 p-4">
                <p className="text-sm text-destructive">Sin variantes disponibles</p>
            </div>
        );
    }

    // If only one variant with no attributes, don't render selector
    if (variants.length === 1 && Object.keys(attributeOptions).length === 0) {
        return null;
    }

    return (
        <div className="space-y-6 rounded-lg border border-border bg-card p-6">
            <h3 className="font-semibold text-card-foreground">Opciones</h3>

            {Object.entries(attributeOptions).map(([attributeKey, values]) => (
                <div key={attributeKey} className="space-y-3">
                    <label className="block text-sm font-medium text-card-foreground capitalize">
                        {attributeKey}
                    </label>

                    <div className="flex flex-wrap gap-2">
                        {values.map((value) => {
                            const isSelected = selectedAttributes[attributeKey] === value;

                            // Check if this value exists in stock
                            const hasValidVariant = variants.some(
                                (v) =>
                                    v.attributes[attributeKey] === value &&
                                    Object.entries(selectedAttributes).every(
                                        ([key, val]) =>
                                            key === attributeKey || v.attributes[key] === val || !selectedAttributes[key],
                                    ),
                            );

                            return (
                                <button
                                    key={`${attributeKey}-${value}`}
                                    onClick={() => handleAttributeChange(attributeKey, value)}
                                    disabled={!hasValidVariant}
                                    className={`rounded-md border-2 px-4 py-2 text-sm font-medium transition-colors ${isSelected
                                        ? 'border-gray-700 dark:border-gray-600 bg-gray-700 dark:bg-gray-600 text-white'
                                        : hasValidVariant
                                            ? 'border-input bg-background hover:border-gray-700 dark:hover:border-gray-500 text-foreground'
                                            : 'border-border bg-muted text-muted-foreground cursor-not-allowed opacity-50'
                                        }`}
                                >
                                    {value}
                                </button>
                            );
                        })}
                    </div>
                </div>
            ))}

            {/* Display Selected Variant Info */}
            {selectedVariant && (
                <div className="rounded-md border border-border bg-muted p-4">
                    <p className="text-sm text-foreground">
                        <span className="font-semibold">SKU:</span> {selectedVariant.sku}
                    </p>
                    <p className="mt-1 text-lg font-bold text-foreground">
                        {new Intl.NumberFormat('es-AR', {
                            style: 'currency',
                            currency: 'ARS',
                        }).format(parseFloat(selectedVariant.price))}
                    </p>
                    <p className="mt-1 text-sm text-foreground">
                        <span className="font-medium">Stock:</span>{' '}
                        <span className={selectedVariant.stock > 0 ? 'text-green-600 dark:text-green-500' : 'text-destructive'}>
                            {selectedVariant.stock > 0 ? `${selectedVariant.stock} unidades` : 'Agotado'}
                        </span>
                    </p>
                </div>
            )}
        </div>
    );
}
