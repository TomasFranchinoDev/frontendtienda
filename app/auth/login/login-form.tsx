'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/stores/useAuthStore';

export function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { login, error, isLoading, clearError } = useAuthStore();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [localError, setLocalError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        // Check if user just registered
        if (searchParams.get('registered') === 'true') {
            setSuccessMessage('¡Cuenta creada exitosamente! Ahora puedes iniciar sesión.');
        }
    }, [searchParams]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLocalError('');
        clearError();

        if (!email || !password) {
            setLocalError('Email and password are required');
            return;
        }

        try {
            await login(email, password);
            router.push('/');
        } catch (err) {
            // Error is handled in the store, just ensure UI updates
            const message = err instanceof Error ? err.message : 'Login failed';
            setLocalError(message);
        }
    };

    const displayError = localError || error;

    return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4">
            <div className="w-full max-w-md rounded-lg border border-border bg-card p-8 shadow-lg">
                <h1 className="mb-6 text-center text-2xl font-bold text-card-foreground">Login</h1>

                {successMessage && (
                    <div className="mb-4 rounded-md bg-green-500/10 p-3 text-sm text-green-600 dark:text-green-400">
                        {successMessage}
                    </div>
                )}

                {displayError && (
                    <div className="mb-4 rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                        {displayError}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-card-foreground mb-2">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your@email.com"
                            disabled={isLoading}
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-card-foreground mb-2">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            disabled={isLoading}
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full rounded-lg bg-background px-4 py-3 text-foreground shadow-md transition-all hover:bg-grey-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-grey-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-grey-600 disabled:hover:shadow-md dark:bg-grey-600 dark:hover:bg-grey-700"
                    >
                        {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                    </button>

                    <div className="text-center">
                        <a
                            href="/forgot-password"
                            className="text-sm font-medium text-primary hover:underline"
                        >
                            ¿Olvidaste tu contraseña?
                        </a>
                    </div>
                </form>

                <p className="mt-4 text-center text-sm text-muted-foreground">
                    ¿No tienes cuenta?{' '}
                    <a href="/auth/register" className="font-medium text-primary hover:underline">
                        Regístrate
                    </a>
                </p>
            </div>
        </div>
    );
}
