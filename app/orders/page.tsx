'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getOrders } from '@/lib/api';
import type { Order } from '@/types';
import { Loader2, Package } from 'lucide-react';
import { useAuthStore } from '@/stores/useAuthStore';

export default function OrdersPage() {
    const router = useRouter();
    const { isAuthenticated, isLoading, checkAuth } = useAuthStore();
    const [hasFetched, setHasFetched] = useState(false);
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Ensure auth check runs when navigating directly
    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    // Redirect if auth check is complete and user is not authenticated
    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push('/auth/login?redirect=/orders');
        }
    }, [isLoading, isAuthenticated, router]);

    const fetchOrders = useCallback(async () => {
        try {
            const response = await getOrders();
            setOrders(response.results || []);
            setHasFetched(true);
        } catch (err: any) {
            setError(err?.message || 'No se pudieron cargar las órdenes');
        } finally {
            setLoading(false);
        }
    }, []);

    // Fetch orders only when user is authenticated and auth check is done
    useEffect(() => {
        if (isLoading) return;
        if (!isAuthenticated) return;
        if (hasFetched) return;
        fetchOrders();
    }, [isLoading, isAuthenticated, hasFetched, fetchOrders]);

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center px-4">
                <div className="flex items-center gap-3 text-muted-foreground">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Verificando sesión...
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center px-4">
                <div className="flex items-center gap-3 text-muted-foreground">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Cargando órdenes...
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-screen items-center justify-center px-4">
                <div className="max-w-md rounded-lg border border-border bg-card p-6 text-center">
                    <p className="mb-4 text-foreground">{error}</p>
                    <button
                        onClick={() => router.refresh()}
                        className="w-full rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
                    >
                        Reintentar
                    </button>
                </div>
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="flex min-h-screen items-center justify-center px-4">
                <div className="max-w-md rounded-lg border border-border bg-card p-6 text-center">
                    <Package className="mx-auto mb-3 h-10 w-10 text-muted-foreground" />
                    <h2 className="mb-2 text-xl font-semibold text-foreground">Aún no tienes compras</h2>
                    <p className="mb-4 text-sm text-muted-foreground">Cuando realices una compra, verás el historial aquí.</p>
                    <Link
                        href="/"
                        className="w-full rounded-md bg-primary px-4 py-2 text-center text-primary-foreground hover:bg-primary/90"
                    >
                        Ver productos
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto w-full max-w-5xl px-4 py-10">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Mis Compras</h1>
                    <p className="text-sm text-muted-foreground">Historial de órdenes</p>
                </div>
            </div>

            <div className="space-y-4">
                {orders.map((order) => (
                    <Link
                        key={order.id}
                        href={`/orders/${order.id}`}
                        className="flex flex-col gap-3 rounded-lg border border-border bg-card p-4 transition hover:border-primary"
                    >
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                                    <Package className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Orden #{order.order_number}</p>
                                    <p className="text-lg font-semibold text-foreground">
                                        {new Intl.NumberFormat('es-AR', {
                                            style: 'currency',
                                            currency: 'ARS',
                                        }).format(parseFloat(order.total))}
                                    </p>
                                </div>
                            </div>
                            <StatusBadge status={order.status} />
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                            <span>Productos: 1</span>
                            <span>Fecha: {new Date(order.created_at).toLocaleString('es-AR')}</span>
                            {order.payment_id && <span>ID Pago: {order.payment_id}</span>}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

function StatusBadge({ status }: { status: Order['status'] }) {
    const map: Record<Order['status'], { label: string; className: string }> = {
        pending: { label: 'Pendiente', className: 'bg-amber-100 text-amber-800' },
        paid: { label: 'Pagada', className: 'bg-green-100 text-green-800' },
        cancelled: { label: 'Cancelada', className: 'bg-red-100 text-red-800' },
        refunded: { label: 'Reembolsada', className: 'bg-blue-100 text-blue-800' },
    };

    const { label, className } = map[status] || map.pending;

    return (
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${className}`}>
            {label}
        </span>
    );
}
