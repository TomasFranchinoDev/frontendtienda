'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/stores/useAuthStore';

/**
 * Client-side auth initializer.
 * Checks authentication status on mount.
 */
export function AuthInitializer() {
    const { checkAuth } = useAuthStore();

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    return null;
}
