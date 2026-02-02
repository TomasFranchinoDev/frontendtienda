'use client';

import { useCallback, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useOrderPolling } from '@/hooks/use-order-polling';
import { CheckCircle, XCircle, Clock, Loader2, Truck, Package } from 'lucide-react';

export default function OrderStatusPage() {
    const params = useParams();
    const router = useRouter();
    const orderId = params.id as string;

    const onPaymentConfirmed = useCallback((order: any) => {
    }, []);

    const onPaymentCancelled = useCallback((order: any) => {
    }, []);

    const onTimeout = useCallback(() => {
    }, []);

    const { order, isPolling, error, pollCount, stopPolling } = useOrderPolling(orderId, {
        onPaymentConfirmed,
        onPaymentCancelled,
        onTimeout,
    });

    useEffect(() => {
        // Cleanup on unmount
        return () => {
            stopPolling();
        };
    }, [stopPolling]);

    if (error) {
        return (
            <div className="mx-auto flex min-h-screen max-w-2xl items-center justify-center px-4 py-16">
                <div className="w-full rounded-lg border border-destructive bg-destructive/10 p-8 text-center">
                    <XCircle className="mx-auto mb-4 h-16 w-16 text-destructive" />
                    <h1 className="mb-2 text-2xl font-bold text-foreground">Error</h1>
                    <p className="mb-6 text-muted-foreground">{error}</p>
                    <button
                        onClick={() => router.push('/')}
                        className="rounded-md bg-primary px-6 py-2 text-primary-foreground hover:bg-primary/90"
                    >
                        Volver al inicio
                    </button>
                </div>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="mx-auto flex min-h-screen max-w-2xl items-center justify-center px-4 py-16">
                <div className="text-center">
                    <Loader2 className="mx-auto mb-4 h-16 w-16 animate-spin text-primary" />
                    <p className="text-lg text-muted-foreground">Cargando orden...</p>
                </div>
            </div>
        );
    }

    // Delivered state
    if (order.status === 'delivered') {
        return (
            <div className="mx-auto flex min-h-screen max-w-2xl items-center justify-center px-4 py-16">
                <div className="w-full rounded-lg border border-border bg-card p-8 text-center shadow-lg">
                    <div className="mb-6 inline-flex items-center justify-center rounded-full bg-green-100 p-4">
                        <Package className="h-16 w-16 text-green-600" />
                    </div>
                    <h1 className="mb-2 text-3xl font-bold text-foreground">¡Pedido Entregado!</h1>
                    <p className="mb-6 text-lg text-muted-foreground">
                        Tu pedido ha sido entregado exitosamente
                    </p>

                    <div className="mb-8 rounded-lg bg-muted/50 p-6">
                        <div className="mb-4 flex items-center justify-between border-b border-border pb-4">
                            <span className="text-sm font-medium text-muted-foreground">Número de Orden</span>
                            <span className="font-mono text-lg font-semibold text-foreground">
                                {order.order_number}
                            </span>
                        </div>
                        <div className="mb-4 flex items-center justify-between border-b border-border pb-4">
                            <span className="text-sm font-medium text-muted-foreground">Total</span>
                            <span className="text-2xl font-bold text-primary">
                                {new Intl.NumberFormat('es-AR', {
                                    style: 'currency',
                                    currency: 'ARS',
                                }).format(parseFloat(order.total))}
                            </span>
                        </div>
                        {order.tracking_number && (
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-muted-foreground">Número de Seguimiento</span>
                                <span className="font-mono text-sm text-foreground">{order.tracking_number}</span>
                            </div>
                        )}
                    </div>

                    {/* Order Items */}
                    <div className="mb-8 text-left">
                        <h2 className="mb-4 text-lg font-semibold text-foreground">Productos</h2>
                        <div className="space-y-3">
                            {order.items.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between rounded-lg border border-border bg-background p-4"
                                >
                                    <div className="flex-1">
                                        <p className="font-medium text-foreground">{item.product_name}</p>
                                        <p className="text-sm text-muted-foreground">Cantidad: {item.quantity}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold text-foreground">
                                            {new Intl.NumberFormat('es-AR', {
                                                style: 'currency',
                                                currency: 'ARS',
                                            }).format(parseFloat(item.price))}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={() => router.push('/')}
                            className="flex-1 rounded-md border border-border bg-background px-6 py-3 font-medium text-foreground hover:bg-muted"
                        >
                            Continuar comprando
                        </button>
                        <button
                            onClick={() => router.push('/orders')}
                            className="flex-1 rounded-md bg-primary px-6 py-3 font-medium text-primary-foreground hover:bg-primary/90"
                        >
                            Ver mis órdenes
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Shipped state
    if (order.status === 'shipped') {
        return (
            <div className="mx-auto flex min-h-screen max-w-2xl items-center justify-center px-4 py-16">
                <div className="w-full rounded-lg border border-border bg-card p-8 text-center shadow-lg">
                    <div className="mb-6 inline-flex items-center justify-center rounded-full bg-blue-100 p-4">
                        <Truck className="h-16 w-16 text-blue-600" />
                    </div>
                    <h1 className="mb-2 text-3xl font-bold text-foreground">¡Pedido en Camino!</h1>
                    <p className="mb-6 text-lg text-muted-foreground">
                        Tu pedido ha sido enviado y está en camino
                    </p>

                    <div className="mb-8 rounded-lg bg-muted/50 p-6">
                        <div className="mb-4 flex items-center justify-between border-b border-border pb-4">
                            <span className="text-sm font-medium text-muted-foreground">Número de Orden</span>
                            <span className="font-mono text-lg font-semibold text-foreground">
                                {order.order_number}
                            </span>
                        </div>
                        <div className="mb-4 flex items-center justify-between border-b border-border pb-4">
                            <span className="text-sm font-medium text-muted-foreground">Total</span>
                            <span className="text-2xl font-bold text-primary">
                                {new Intl.NumberFormat('es-AR', {
                                    style: 'currency',
                                    currency: 'ARS',
                                }).format(parseFloat(order.total))}
                            </span>
                        </div>
                        {order.tracking_number && (
                            <div className="mb-4 flex items-center justify-between border-b border-border pb-4">
                                <span className="text-sm font-medium text-muted-foreground">Número de Seguimiento</span>
                                <span className="font-mono text-sm text-foreground">{order.tracking_number}</span>
                            </div>
                        )}
                        {order.payment_id && (
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-muted-foreground">ID de Pago</span>
                                <span className="font-mono text-sm text-foreground">{order.payment_id}</span>
                            </div>
                        )}
                    </div>

                    {/* Order Items */}
                    <div className="mb-8 text-left">
                        <h2 className="mb-4 text-lg font-semibold text-foreground">Productos</h2>
                        <div className="space-y-3">
                            {order.items.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between rounded-lg border border-border bg-background p-4"
                                >
                                    <div className="flex-1">
                                        <p className="font-medium text-foreground">{item.product_name}</p>
                                        <p className="text-sm text-muted-foreground">Cantidad: {item.quantity}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold text-foreground">
                                            {new Intl.NumberFormat('es-AR', {
                                                style: 'currency',
                                                currency: 'ARS',
                                            }).format(parseFloat(item.price))}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={() => router.push('/')}
                            className="flex-1 rounded-md border border-border bg-background px-6 py-3 font-medium text-foreground hover:bg-muted"
                        >
                            Continuar comprando
                        </button>
                        <button
                            onClick={() => router.push('/orders')}
                            className="flex-1 rounded-md bg-primary px-6 py-3 font-medium text-primary-foreground hover:bg-primary/90"
                        >
                            Ver mis órdenes
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Success state - Payment confirmed (paid)
    if (order.status === 'paid') {
        return (
            <div className="mx-auto flex min-h-screen max-w-2xl items-center justify-center px-4 py-16">
                <div className="w-full rounded-lg border border-border bg-card p-8 text-center shadow-lg">
                    <div className="mb-6 inline-flex items-center justify-center rounded-full bg-green-100 p-4">
                        <CheckCircle className="h-16 w-16 text-green-600" />
                    </div>
                    <h1 className="mb-2 text-3xl font-bold text-foreground">¡Pago Confirmado!</h1>
                    <p className="mb-6 text-lg text-muted-foreground">
                        Tu orden ha sido procesada exitosamente
                    </p>

                    <div className="mb-8 rounded-lg bg-muted/50 p-6">
                        <div className="mb-4 flex items-center justify-between border-b border-border pb-4">
                            <span className="text-sm font-medium text-muted-foreground">Número de Orden</span>
                            <span className="font-mono text-lg font-semibold text-foreground">
                                {order.order_number}
                            </span>
                        </div>
                        <div className="mb-4 flex items-center justify-between border-b border-border pb-4">
                            <span className="text-sm font-medium text-muted-foreground">Total</span>
                            <span className="text-2xl font-bold text-primary">
                                {new Intl.NumberFormat('es-AR', {
                                    style: 'currency',
                                    currency: 'ARS',
                                }).format(parseFloat(order.total))}
                            </span>
                        </div>
                        {order.payment_id && (
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-muted-foreground">ID de Pago</span>
                                <span className="font-mono text-sm text-foreground">{order.payment_id}</span>
                            </div>
                        )}
                    </div>

                    {/* Order Items */}
                    <div className="mb-8 text-left">
                        <h2 className="mb-4 text-lg font-semibold text-foreground">Productos</h2>
                        <div className="space-y-3">
                            {order.items.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between rounded-lg border border-border bg-background p-4"
                                >
                                    <div className="flex-1">
                                        <p className="font-medium text-foreground">{item.product_name}</p>
                                        <p className="text-sm text-muted-foreground">Cantidad: {item.quantity}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold text-foreground">
                                            {new Intl.NumberFormat('es-AR', {
                                                style: 'currency',
                                                currency: 'ARS',
                                            }).format(parseFloat(item.price))}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={() => router.push('/')}
                            className="flex-1 rounded-md border border-border bg-background px-6 py-3 font-medium text-foreground hover:bg-muted"
                        >
                            Continuar comprando
                        </button>
                        <button
                            onClick={() => router.push('/orders')}
                            className="flex-1 rounded-md bg-primary px-6 py-3 font-medium text-primary-foreground hover:bg-primary/90"
                        >
                            Ver mis órdenes
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Cancelled/Refunded state
    if (order.status === 'cancelled' || order.status === 'refunded') {
        return (
            <div className="mx-auto flex min-h-screen max-w-2xl items-center justify-center px-4 py-16">
                <div className="w-full rounded-lg border border-border bg-card p-8 text-center shadow-lg">
                    <div className="mb-6 inline-flex items-center justify-center rounded-full bg-red-100 p-4">
                        <XCircle className="h-16 w-16 text-red-600" />
                    </div>
                    <h1 className="mb-2 text-3xl font-bold text-foreground">
                        {order.status === 'cancelled' ? 'Orden Cancelada' : 'Pago Reembolsado'}
                    </h1>
                    <p className="mb-6 text-lg text-muted-foreground">
                        {order.status === 'cancelled'
                            ? 'Esta orden ha sido cancelada'
                            : 'El pago de esta orden ha sido reembolsado'}
                    </p>

                    <div className="mb-8 rounded-lg bg-muted/50 p-6">
                        <div className="mb-4 flex items-center justify-between">
                            <span className="text-sm font-medium text-muted-foreground">Número de Orden</span>
                            <span className="font-mono text-lg font-semibold text-foreground">
                                {order.order_number}
                            </span>
                        </div>
                    </div>

                    <button
                        onClick={() => router.push('/')}
                        className="w-full rounded-md bg-primary px-6 py-3 font-medium text-primary-foreground hover:bg-primary/90"
                    >
                        Volver al inicio
                    </button>
                </div>
            </div>
        );
    }

    // Pending state - Still polling
    return (
        <div className="mx-auto flex min-h-screen max-w-2xl items-center justify-center px-4 py-16">
            <div className="w-full rounded-lg border border-border bg-card p-8 text-center shadow-lg">
                <div className="mb-6 inline-flex items-center justify-center rounded-full bg-blue-100 p-4">
                    {isPolling ? (
                        <Loader2 className="h-16 w-16 animate-spin text-blue-600" />
                    ) : (
                        <Clock className="h-16 w-16 text-blue-600" />
                    )}
                </div>
                <h1 className="mb-2 text-3xl font-bold text-foreground">
                    {isPolling ? 'Verificando Pago...' : 'Pago Pendiente'}
                </h1>
                <p className="mb-6 text-lg text-muted-foreground">
                    {isPolling
                        ? 'Estamos confirmando tu pago con Mercado Pago. Esto puede tomar unos segundos.'
                        : 'El pago está siendo procesado. Por favor, espera.'}
                </p>

                <div className="mb-8 rounded-lg bg-muted/50 p-6">
                    <div className="mb-4 flex items-center justify-between border-b border-border pb-4">
                        <span className="text-sm font-medium text-muted-foreground">Número de Orden</span>
                        <span className="font-mono text-lg font-semibold text-foreground">{order.order_number}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-muted-foreground">Total</span>
                        <span className="text-2xl font-bold text-primary">
                            {new Intl.NumberFormat('es-AR', {
                                style: 'currency',
                                currency: 'ARS',
                            }).format(parseFloat(order.total))}
                        </span>
                    </div>
                </div>

                {isPolling && (
                    <div className="mb-6">
                        <div className="mb-2 flex items-center justify-between text-sm text-muted-foreground">
                            <span>Verificaciones realizadas</span>
                            <span className="font-mono">{pollCount}</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-muted">
                            <div
                                className="h-full bg-primary transition-all duration-300"
                                style={{ width: `${Math.min((pollCount / 32) * 100, 100)}%` }}
                            />
                        </div>
                    </div>
                )}

                <div className="space-y-3">
                    <button
                        onClick={() => window.location.reload()}
                        className="w-full rounded-md bg-primary px-6 py-3 font-medium text-primary-foreground hover:bg-primary/90"
                    >
                        Verificar Estado
                    </button>
                    <button
                        onClick={() => router.push('/')}
                        className="w-full rounded-md border border-border bg-background px-6 py-3 font-medium text-foreground hover:bg-muted"
                    >
                        Volver al inicio
                    </button>
                </div>

                <p className="mt-6 text-xs text-muted-foreground">
                    Si el pago no se confirma en unos minutos, por favor contacta a soporte con tu número de orden.
                </p>
            </div>
        </div>
    );
}