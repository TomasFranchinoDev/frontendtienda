'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { CartItem } from '@/types';

interface CartStore {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (variantId: number) => void;
    updateQuantity: (variantId: number, quantity: number) => void;
    clearCart: () => void;
    getTotalPrice: () => number;
    getTotalItems: () => number;
}

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],

            addItem: (item: CartItem) => {
                set((state) => {
                    const existingItem = state.items.find((i) => i.variantId === item.variantId);

                    if (existingItem) {
                        // Update quantity if item already exists
                        return {
                            items: state.items.map((i) =>
                                i.variantId === item.variantId
                                    ? { ...i, quantity: i.quantity + item.quantity }
                                    : i,
                            ),
                        };
                    }

                    // Add new item
                    return {
                        items: [...state.items, item],
                    };
                });
            },

            removeItem: (variantId: number) => {
                set((state) => ({
                    items: state.items.filter((i) => i.variantId !== variantId),
                }));
            },

            updateQuantity: (variantId: number, quantity: number) => {
                if (quantity <= 0) {
                    get().removeItem(variantId);
                    return;
                }

                set((state) => ({
                    items: state.items.map((i) =>
                        i.variantId === variantId ? { ...i, quantity } : i,
                    ),
                }));
            },

            clearCart: () => {
                set({ items: [] });
            },

            getTotalPrice: () => {
                return get().items.reduce((total, item) => {
                    const price = parseFloat(item.price) || 0;
                    return total + price * item.quantity;
                }, 0);
            },

            getTotalItems: () => {
                return get().items.reduce((total, item) => total + item.quantity, 0);
            },
        }),
        {
            name: 'cart-store',
            storage: typeof window !== 'undefined' ? createJSONStorage(() => localStorage) : undefined,
        },
    ),
);
