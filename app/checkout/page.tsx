'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/useAuthStore';
import { useCartStore } from '@/stores/useCartStore';
import { CheckoutForm } from './CheckoutForm'

export default function CheckoutPage() {
    const router = useRouter();
    const { isAuthenticated, user } = useAuthStore();
    const { items } = useCartStore();

    // Check authentication and redirect if needed
    useEffect(() => {
        if (!isAuthenticated) {
            router.push('auth/login?redirect=/checkout');
        }
    }, [isAuthenticated, router]);

    // Redirect if cart is empty
    if (items.length === 0) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-center">
                    <p className="mb-4 text-lg text-muted-foreground">Tu carrito está vacío</p>
                    <a href="/" className="text-primary hover:underline">
                        Continuar comprando
                    </a>
                </div>
            </div>
        );
    }

    // Show loading state while checking auth
    if (!isAuthenticated) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-muted-foreground">Cargando...</p>
            </div>
        );
    }

    return (
        <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
            <h1 className="mb-8 text-3xl font-bold text-foreground">Checkout</h1>

            <div className="grid gap-8 lg:grid-cols-3">
                {/* Form */}
                <div className="lg:col-span-2">
                    <CheckoutForm />
                </div>

                {/* Order Summary */}
                <div>
                    <div className="rounded-lg border border-border bg-card p-6 sticky top-4">
                        <h2 className="mb-4 text-lg font-semibold text-card-foreground">Resumen de Orden</h2>

                        <div className="space-y-3 border-b border-border pb-4">
                            {items.map((item) => {
                                const itemTotal = parseFloat(item.price) * item.quantity;
                                const formattedPrice = new Intl.NumberFormat('es-AR', {
                                    style: 'currency',
                                    currency: 'ARS',
                                }).format(itemTotal);

                                return (
                                    <div key={item.variantId} className="text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-foreground">{item.productName}</span>
                                            <span className="font-medium text-primary">{formattedPrice}</span>
                                        </div>
                                        <div className="text-xs text-muted-foreground">
                                            {item.variantSku} × {item.quantity}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="mt-4 space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Subtotal</span>
                                <span className="font-medium text-foreground">
                                    {new Intl.NumberFormat('es-AR', {
                                        style: 'currency',
                                        currency: 'ARS',
                                    }).format(useCartStore.getState().getTotalPrice())}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Envío</span>
                                <span className="font-medium text-foreground">A calcular</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
