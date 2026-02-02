'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';

/**
 * This page handles redirects from Mercado Pago.
 * It extracts the order_id from query params and redirects to the order status page.
 */
export default function CheckoutSuccessPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const orderId = searchParams.get('order_id') || searchParams.get('external_reference');

    useEffect(() => {
        if (orderId) {
            // Redirect to order status page with polling
            router.replace(`/orders/${orderId}`);
        } else {
            // No order ID found, redirect to home
            setTimeout(() => {
                router.replace('/');
            }, 3000);
        }
    }, [orderId, router]);

    return (
        <div className="flex min-h-screen items-center justify-center px-4">
            <div className="w-full max-w-md rounded-lg border border-border bg-card p-8 text-center">
                <Loader2 className="mx-auto mb-6 h-16 w-16 animate-spin text-primary" />
                <h1 className="mb-2 text-2xl font-bold text-foreground">Procesando...</h1>
                <p className="text-muted-foreground">
                    {orderId
                        ? 'Verificando el estado de tu pago...'
                        : 'Redirigiendo a la página principal...'}
                </p>
            </div>
        </div>
    );
}
