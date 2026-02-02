'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { useCartStore } from '@/stores/useCartStore';

export function CartSheet() {
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const { items, removeItem, updateQuantity, getTotalPrice, getTotalItems } = useCartStore();

    useEffect(() => {
        setMounted(true);
    }, []);

    const totalPrice = getTotalPrice();
    const totalItems = getTotalItems();

    const formattedTotal = new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
    }).format(totalPrice);

    return (
        <>
            {/* Cart Trigger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative inline-flex items-center rounded-md px-3 py-2 text-sm font-medium text-foreground transition-all hover:text-primary hover:scale-105"
                aria-label="Carrito"
            >
                <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                </svg>
                {totalItems > 0 && (
                    <span className="ml-2 inline-flex items-center justify-center rounded-full bg-gray-700 px-2 py-1 text-xs font-semibold text-white">
                        {totalItems}
                    </span>
                )}
            </button>

            {/* Cart Sheet Overlay and Content */}
            {mounted && isOpen && createPortal(
                <>
                    {/* Overlay */}
                    <div
                        className="fixed inset-0 z-[9998] bg-black/50 backdrop-blur-sm"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Sheet */}
                    <div className="fixed right-0 top-0 z-[9999] h-full w-full max-w-md overflow-y-auto border-l border-border bg-card shadow-2xl animate-in slide-in-from-right">
                        {/* Header */}
                        <div className="sticky top-0 border-b border-border bg-card p-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold text-foreground">Carrito</h2>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="text-muted-foreground hover:text-foreground"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>

                        {/* Content */}
                        {items.length === 0 ? (
                            <div className="flex h-full flex-col items-center justify-center p-4 text-center">
                                <p className="text-muted-foreground">Tu carrito está vacío</p>
                                <Link
                                    href="/"
                                    onClick={() => setIsOpen(false)}
                                    className="mt-4 text-sm font-medium text-primary hover:underline"
                                >
                                    Continuar comprando
                                </Link>
                            </div>
                        ) : (
                            <>
                                {/* Items List */}
                                <div className="space-y-4 p-4">
                                    {items.map((item) => {
                                        const itemTotal = parseFloat(item.price) * item.quantity;
                                        const formattedPrice = new Intl.NumberFormat('es-AR', {
                                            style: 'currency',
                                            currency: 'ARS',
                                        }).format(parseFloat(item.price));
                                        const formattedTotal = new Intl.NumberFormat('es-AR', {
                                            style: 'currency',
                                            currency: 'ARS',
                                        }).format(itemTotal);

                                        return (
                                            <div
                                                key={item.variantId}
                                                className="flex gap-3 rounded-md border border-border bg-background p-3"
                                            >
                                                {/* Product Info */}
                                                <div className="flex-1">
                                                    <Link
                                                        href={`/product/${item.productSlug}`}
                                                        onClick={() => setIsOpen(false)}
                                                        className="text-sm font-medium text-foreground hover:text-primary"
                                                    >
                                                        {item.productName}
                                                    </Link>
                                                    <p className="text-xs text-muted-foreground">{item.variantSku}</p>

                                                    {/* Attributes */}
                                                    {Object.entries(item.attributes).length > 0 && (
                                                        <p className="mt-1 text-xs text-muted-foreground">
                                                            {Object.entries(item.attributes)
                                                                .map(([key, val]) => `${key}: ${val}`)
                                                                .join(', ')}
                                                        </p>
                                                    )}

                                                    {/* Price and Quantity */}
                                                    <div className="mt-2 flex items-center justify-between">
                                                        <span className="text-sm font-semibold text-primary">
                                                            {formattedPrice}
                                                        </span>
                                                        <div className="flex items-center gap-1">
                                                            <button
                                                                onClick={() =>
                                                                    updateQuantity(item.variantId, item.quantity - 1)
                                                                }
                                                                className="rounded border border-border px-2 py-1 text-xs hover:bg-muted"
                                                            >
                                                                −
                                                            </button>
                                                            <span className="w-8 text-center text-xs font-medium">
                                                                {item.quantity}
                                                            </span>
                                                            <button
                                                                onClick={() =>
                                                                    updateQuantity(item.variantId, item.quantity + 1)
                                                                }
                                                                className="rounded border border-border px-2 py-1 text-xs hover:bg-muted"
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Total and Remove */}
                                                <div className="flex flex-col items-end justify-between">
                                                    <button
                                                        onClick={() => removeItem(item.variantId)}
                                                        className="text-xs text-destructive hover:underline"
                                                    >
                                                        Eliminar
                                                    </button>
                                                    <span className="text-sm font-semibold text-foreground">
                                                        {formattedTotal}
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Footer */}
                                <div className="border-t border-border p-4">
                                    <div className="mb-4 flex items-center justify-between">
                                        <span className="font-semibold text-foreground">Subtotal</span>
                                        <span className="text-lg font-bold text-primary">{formattedTotal}</span>
                                    </div>
                                    <Link
                                        href="/checkout"
                                        onClick={() => setIsOpen(false)}
                                        className="block w-full rounded-md bg-gray-700 px-4 py-2 text-center font-medium text-white hover:bg-gray-800"
                                    >
                                        Ir al Checkout
                                    </Link>
                                </div>
                            </>
                        )}
                    </div>
                </>,
                document.body
            )}
        </>
    );
}
