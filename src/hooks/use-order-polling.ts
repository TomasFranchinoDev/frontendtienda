import { useState, useEffect, useCallback, useRef } from 'react';
import { apiFetch } from '@/lib/api';

export type OrderStatus = 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';

export interface Order {
    id: number;
    order_number: string;
    status: OrderStatus;
    total: string;
    payment_id: string | null;
    tracking_number: string | null;
    created_at: string;
    updated_at: string;
    items: Array<{
        variant_id: number;
        product_name: string;
        quantity: number;
        price: string;
    }>;
}

export interface UseOrderPollingResult {
    order: Order | null;
    isPolling: boolean;
    error: string | null;
    pollCount: number;
    stopPolling: () => void;
    refetch: () => Promise<void>;
}

interface UseOrderPollingOptions {
    /** Whether to start polling automatically. Default: true */
    enabled?: boolean;
    /** Callback when order status becomes 'paid' */
    onPaymentConfirmed?: (order: Order) => void;
    /** Callback when order status becomes 'cancelled' */
    onPaymentCancelled?: (order: Order) => void;
    /** Callback when polling times out */
    onTimeout?: () => void;
}

/**
 * Hook for polling order status with Mercado Pago payment verification strategy.
 * 
 * Polling Strategy:
 * - Phase 1 (first 30 seconds): Poll every 2 seconds (15 polls)
 * - Phase 2 (next 2 minutes): Poll every 10 seconds (12 polls)
 * - Phase 3 (next 2.5 minutes): Poll every 30 seconds (5 polls)
 * - Total: ~5 minutes maximum
 * 
 * Stops polling when:
 * - Status becomes 'paid', 'shipped', 'delivered'
 * - Status becomes 'cancelled'
 * - Maximum polls reached
 */
export function useOrderPolling(
    orderId: number | string | null,
    options: UseOrderPollingOptions = {}
): UseOrderPollingResult {
    const { enabled = true, onPaymentConfirmed, onPaymentCancelled, onTimeout } = options;

    const [order, setOrder] = useState<Order | null>(null);
    const [isPolling, setIsPolling] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [pollCount, setPollCount] = useState(0);

    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const isStoppedRef = useRef(false);
    const pollCountRef = useRef(0);
    const callbacksRef = useRef({ onPaymentConfirmed, onPaymentCancelled, onTimeout });

    // Update callbacks ref whenever they change
    useEffect(() => {
        callbacksRef.current = { onPaymentConfirmed, onPaymentCancelled, onTimeout };
    }, [onPaymentConfirmed, onPaymentCancelled, onTimeout]);

    // Maximum poll counts for each phase
    const PHASE_1_MAX = 15; // 30 seconds @ 2s intervals
    const PHASE_2_MAX = 27; // +2 minutes @ 10s intervals (15 + 12)
    const PHASE_3_MAX = 32; // +2.5 minutes @ 30s intervals (27 + 5)

    const getPollingInterval = (count: number): number => {
        if (count < PHASE_1_MAX) return 2000;  // Phase 1: 2 seconds
        if (count < PHASE_2_MAX) return 10000; // Phase 2: 10 seconds
        return 30000;                          // Phase 3: 30 seconds
    };

    const stopPolling = useCallback(() => {
        isStoppedRef.current = true;
        setIsPolling(false);
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
    }, []);

    const refetch = useCallback(async () => {
        if (!orderId) return;

        try {
            const data = await apiFetch<Order>(`/api/orders/${orderId}/`);
            if (data) {
                setOrder(data);
            }
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Failed to fetch order';
            setError(message);
        }
    }, [orderId]);

    useEffect(() => {
        if (!enabled || !orderId) return;

        // Reset state
        isStoppedRef.current = false;
        pollCountRef.current = 0;
        setPollCount(0);
        setError(null);
        setIsPolling(true);

        // Define poll function inside effect to avoid dependency issues
        const poll = async () => {
            if (isStoppedRef.current || !orderId) return;

            try {
                const data = await apiFetch<Order>(`/api/orders/${orderId}/`);

                if (!data) {
                    stopPolling();
                    return;
                }

                setOrder(data);

                // Increment internal counter
                pollCountRef.current += 1;
                setPollCount(pollCountRef.current);

                // Check if we should stop polling
                // Paid, shipped, or delivered orders don't need polling
                if (data.status === 'paid' || data.status === 'shipped' || data.status === 'delivered') {
                    stopPolling();
                    callbacksRef.current.onPaymentConfirmed?.(data);
                    return;
                }

                if (data.status === 'cancelled' || data.status === 'refunded') {
                    stopPolling();
                    callbacksRef.current.onPaymentCancelled?.(data);
                    return;
                }

                // Check if we've reached max polls
                if (pollCountRef.current >= PHASE_3_MAX) {
                    stopPolling();
                    callbacksRef.current.onTimeout?.();
                    return;
                }

                // Schedule next poll
                const interval = getPollingInterval(pollCountRef.current);
                timeoutRef.current = setTimeout(() => {
                    poll();
                }, interval);
            } catch (err) {
                const message = err instanceof Error ? err.message : 'Failed to fetch order';
                setError(message);
                stopPolling();
            }
        };

        // Start first poll immediately
        poll();

        // Cleanup
        return () => {
            stopPolling();
        };
    }, [orderId, enabled, stopPolling]);

    return {
        order,
        isPolling,
        error,
        pollCount,
        stopPolling,
        refetch,
    };
}