'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ApiError } from '@/lib/api';
import { apiRequestPasswordReset } from '@/lib/api';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            // SECURITY: Never reveal if email exists (endpoint returns 200 always)
            await apiRequestPasswordReset(email);
            setSuccess(true);
            setEmail('');
        } catch (err) {
            // Handle network/validation errors
            if (err instanceof ApiError) {
                if (err.status === 400) {
                    // Validation error (invalid email format)
                    setError('Por favor, ingresa un email válido');
                } else {
                    setError(err.message || 'No pudimos procesar tu solicitud');
                }
            } else {
                setError('Error de conexión. Intenta más tarde.');
            }
        } finally {
            setLoading(false);
        }
    };

    // Success state
    if (success) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-background px-4">
                <div className="w-full max-w-md rounded-lg border border-border bg-card p-8 shadow-lg">
                    <h1 className="mb-6 text-center text-2xl font-bold text-card-foreground">Revisa tu email</h1>

                    {/* Success message */}
                    <div className="mb-4 rounded-md bg-green-500/10 p-3 text-sm text-green-600 dark:text-green-400">
                        Si el email existe en nuestro sistema, recibirás instrucciones para recuperar tu contraseña.
                    </div>

                    {/* Info message */}
                    <div className="mb-6 rounded-md bg-blue-500/10 p-3 text-sm text-blue-600 dark:text-blue-400">
                        <p>
                            El link de recuperación es válido por <strong>30 minutos</strong>.
                        </p>
                        <p className="mt-2">
                            Si no recibiste el email, revisa la carpeta de spam o{' '}
                            <button
                                onClick={() => setSuccess(false)}
                                className="font-medium underline hover:opacity-80"
                            >
                                intenta de nuevo
                            </button>
                            .
                        </p>
                    </div>

                    <Link
                        href="/auth/login"
                        className="w-full block text-center rounded-lg bg-background px-4 py-3 text-foreground shadow-md transition-all hover:bg-grey-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-grey-500 focus:ring-offset-2 dark:bg-grey-600 dark:hover:bg-grey-700"
                    >
                        Volver al inicio de sesión
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4">
            <div className="w-full max-w-md rounded-lg border border-border bg-card p-8 shadow-lg">
                <h1 className="mb-2 text-center text-2xl font-bold text-card-foreground">¿Olvidaste tu contraseña?</h1>
                <p className="mb-6 text-center text-sm text-muted-foreground">
                    Ingresa tu email y te enviaremos instrucciones para recuperarla.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Error message */}
                    {error && (
                        <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                            {error}
                        </div>
                    )}

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-card-foreground mb-2">
                            Correo electrónico
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={loading}
                            placeholder="tu@email.com"
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-background px-4 py-3 text-foreground shadow-md transition-all hover:bg-grey-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-grey-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-grey-600 disabled:hover:shadow-md dark:bg-grey-600 dark:hover:bg-grey-700"
                    >
                        {loading ? 'Enviando...' : 'Enviar instrucciones'}
                    </button>

                    <div className="text-center">
                        <Link
                            href="/auth/login"
                            className="text-sm font-medium text-primary hover:underline"
                        >
                            Volver al inicio de sesión
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
