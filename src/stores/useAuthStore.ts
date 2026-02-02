'use client';

import { create } from 'zustand';
import type { User } from '@/types';

interface AuthStore {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;

    checkAuth: () => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    setUser: (user: User | null) => void;
    clearError: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,

    checkAuth: async () => {
        set({ isLoading: true, error: null });
        try {
            const { apiCheckAuth } = await import('@/lib/api');
            const user = await apiCheckAuth();
            set({ user, isAuthenticated: true, isLoading: false });
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Auth check failed';
            set({ user: null, isAuthenticated: false, isLoading: false, error: null });
        }
    },

    login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
            const { apiLogin } = await import('@/lib/api');
            await apiLogin(email, password);

            // After successful login, check auth to populate user
            const { apiCheckAuth } = await import('@/lib/api');
            const user = await apiCheckAuth();
            set({ user, isAuthenticated: true, isLoading: false });
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Login failed';
            set({ user: null, isAuthenticated: false, isLoading: false, error: message });
            throw err;
        }
    },

    logout: async () => {
        set({ isLoading: true, error: null });

        try {
            const { apiLogout } = await import('@/lib/api');
            await apiLogout();
        } catch (err) {
            console.warn("Logout backend failed:");
        } finally {
            set({
                user: null,
                isAuthenticated: false,
                isLoading: false,
            });
        }
    },

    setUser: (user: User | null) => {
        set({ user, isAuthenticated: user !== null });
    },

    clearError: () => {
        set({ error: null });
    },
}));
