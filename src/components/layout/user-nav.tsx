'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/useAuthStore';
import { LogIn, User, Package, LogOut } from 'lucide-react';

export function UserNav() {
    const router = useRouter();
    const { user, isAuthenticated, logout } = useAuthStore();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await logout();
            router.push('/');
        } catch (error) {
            console.error('Logout failed:');
        }
    };

    if (!isAuthenticated || !user) {
        return (
            <a
                href="/auth/login"
                className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-foreground transition-all hover:text-primary hover:scale-105"
            >
                <LogIn className="h-4 w-4" />
                <span className="hidden sm:inline">Ingresar</span>
            </a>
        );
    }

    // Get user initials
    const initials = `${user.first_name?.[0] || ''}${user.last_name?.[0] || ''}`.toUpperCase() || user.email[0].toUpperCase();

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-foreground transition-all hover:text-primary hover:scale-105"
            >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-700 dark:bg-gray-600 text-white">
                    <span className="text-xs font-semibold">{initials}</span>
                </div>
                <span className="hidden sm:inline text-foreground">{user.first_name || user.email}</span>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="absolute right-0 top-full z-50 mt-2 w-56 rounded-md border border-border bg-popover p-1 shadow-md">
                        <div className="px-2 py-1.5 text-sm text-muted-foreground">
                            <p className="font-medium text-foreground">{user.first_name} {user.last_name}</p>
                            <p className="text-xs">{user.email}</p>
                        </div>
                        <div className="my-1 h-px bg-border" />
                        <a
                            href="/orders"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm transition-colors hover:bg-primary/10 hover:text-primary"
                        >
                            <Package className="h-4 w-4" />
                            <span>Mis Compras</span>
                        </a>
                        <button
                            onClick={() => {
                                setIsOpen(false);
                                handleLogout();
                            }}
                            className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm transition-colors hover:bg-primary/10 hover:text-primary"
                        >
                            <LogOut className="h-4 w-4" />
                            <span>Cerrar Sesión</span>
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
