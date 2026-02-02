'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { PasswordResetForm } from '@/components/auth/password-reset-form';

export function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Validate token on mount
  useEffect(() => {
    if (!token) {
      setError('Token de recuperación no encontrado. Solicita uno nuevo.');
    }
  }, [token]);

  // Success state
  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="w-full max-w-md rounded-lg border border-border bg-card p-8 shadow-lg">
          <h1 className="mb-6 text-center text-2xl font-bold text-card-foreground">¡Listo!</h1>

          {/* Success message */}
          <div className="mb-4 rounded-md bg-green-500/10 p-3 text-sm text-green-600 dark:text-green-400">
            Tu contraseña ha sido actualizada correctamente.
          </div>

          {/* Info message */}
          <div className="mb-6 rounded-md bg-blue-500/10 p-3 text-sm text-blue-600 dark:text-blue-400">
            Redirigiendo al login en unos segundos...
          </div>

          <Link
            href="/auth/login"
            className="w-full block text-center rounded-lg bg-background px-4 py-3 text-foreground shadow-md transition-all hover:bg-grey-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-grey-500 focus:ring-offset-2 dark:bg-grey-600 dark:hover:bg-grey-700"
          >
            Ir al login ahora
          </Link>
        </div>
      </div>
    );
  }

  // Invalid token state
  if (error && error.includes('no encontrado')) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="w-full max-w-md rounded-lg border border-border bg-card p-8 shadow-lg">
          <h1 className="mb-2 text-center text-2xl font-bold text-card-foreground">Link inválido</h1>
          <p className="mb-6 text-center text-sm text-muted-foreground">
            El link de recuperación no es válido o expiró.
          </p>

          {/* Error message */}
          <div className="mb-6 rounded-md bg-destructive/10 p-3 text-sm text-destructive">
            {error}
          </div>

          <div className="space-y-3">
            <Link
              href="/forgot-password"
              className="w-full block text-center rounded-lg bg-background px-4 py-3 text-foreground shadow-md transition-all hover:bg-grey-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-grey-500 focus:ring-offset-2 dark:bg-grey-600 dark:hover:bg-grey-700"
            >
              Solicitar nuevo link
            </Link>
            <Link
              href="/auth/login"
              className="w-full block text-center rounded-lg border border-border bg-card px-4 py-3 text-card-foreground shadow-sm transition-all hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring"
            >
              Volver al login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Form state
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md rounded-lg border border-border bg-card p-8 shadow-lg">
        <h1 className="mb-2 text-center text-2xl font-bold text-card-foreground">
          Recupera tu contraseña
        </h1>
        <p className="mb-6 text-center text-sm text-muted-foreground">
          Ingresa tu nueva contraseña
        </p>

        {token && (
          <PasswordResetForm token={token} onSuccess={() => setSuccess(true)} />
        )}

        {!token && (
          <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
