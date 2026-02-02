'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, RegisterFormData } from '@/schemas/auth';
import { PasswordStrength } from './password-strength';
import { apiRegister } from '@/lib/api';

interface RegisterFormProps {
    onSuccess?: () => void;
}

/**
 * RegisterForm Component
 * 
 * Features:
 * - React Hook Form + Zod validation
 * - Real-time password strength indicator
 * - Disposable email check (backend)
 * - Field-level error messages
 */
export function RegisterForm({ onSuccess }: RegisterFormProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState('');

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isValid },
        reset,
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        mode: 'onChange', // Validate on change for better UX
    });

    const passwordValue = watch('password', '');

    const onSubmit = async (data: RegisterFormData) => {
        setApiError('');
        setIsLoading(true);

        try {
            await apiRegister(data);
            // Success
            reset();
            onSuccess?.();
            router.push('/auth/login?registered=true');
        } catch (err) {
            const message =
                err instanceof Error
                    ? err.message
                    : 'Error durante el registro. Por favor intenta nuevamente.';
            setApiError(message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            {/* API Error Alert */}
            {apiError && (
                <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                    {apiError}
                </div>
            )}

            {/* Email Field */}
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-card-foreground mb-2">
                    Email *
                </label>
                <input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    disabled={isLoading}
                    className={`w-full rounded-md border px-3 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 ${errors.email ? 'border-destructive focus:ring-destructive' : 'border-input bg-background'
                        }`}
                    {...register('email')}
                />
                {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}
            </div>

            {/* Username Field */}
            <div>
                <label htmlFor="username" className="block text-sm font-medium text-card-foreground mb-2">
                    Nombre de Usuario
                </label>
                <input
                    id="username"
                    type="text"
                    placeholder="usuario123"
                    disabled={isLoading}
                    className={`w-full rounded-md border bg-background px-3 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 ${errors.username ? 'border-destructive focus:ring-destructive' : 'border-input'
                        }`}
                    {...register('username')}
                />
                {errors.username && (
                    <p className="mt-1 text-xs text-destructive">{errors.username.message}</p>
                )}
            </div>

            {/* Name Fields - Grid Layout */}
            <div className="grid grid-cols-2 gap-4">
                {/* First Name */}
                <div>
                    <label htmlFor="first_name" className="block text-sm font-medium text-card-foreground mb-2">
                        Nombre *
                    </label>
                    <input
                        id="first_name"
                        type="text"
                        placeholder="Juan"
                        disabled={isLoading}
                        className={`w-full rounded-md border bg-background px-3 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 ${errors.first_name ? 'border-destructive focus:ring-destructive' : 'border-input'
                            }`}
                        {...register('first_name')}
                    />
                    {errors.first_name && (
                        <p className="mt-1 text-xs text-destructive">{errors.first_name.message}</p>
                    )}
                </div>

                {/* Last Name */}
                <div>
                    <label htmlFor="last_name" className="block text-sm font-medium text-card-foreground mb-2">
                        Apellido *
                    </label>
                    <input
                        id="last_name"
                        type="text"
                        placeholder="Pérez"
                        disabled={isLoading}
                        className={`w-full rounded-md border bg-background px-3 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 ${errors.last_name ? 'border-destructive focus:ring-destructive' : 'border-input'
                            }`}
                        {...register('last_name')}
                    />
                    {errors.last_name && (
                        <p className="mt-1 text-xs text-destructive">{errors.last_name.message}</p>
                    )}
                </div>
            </div>

            {/* Password Field with Strength Indicator */}
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-card-foreground mb-2">
                    Contraseña *
                </label>
                <input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    disabled={isLoading}
                    className={`w-full rounded-md border bg-background px-3 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 ${errors.password ? 'border-destructive focus:ring-destructive' : 'border-input'
                        }`}
                    {...register('password')}
                />
                {errors.password && (
                    <p className="mt-1 text-xs text-destructive">{errors.password.message}</p>
                )}

                {/* Password Strength Component */}
                <div className="mt-3">
                    <PasswordStrength password={passwordValue} />
                </div>
            </div>

            {/* Confirm Password Field */}
            <div>
                <label htmlFor="password_confirm" className="block text-sm font-medium text-card-foreground mb-2">
                    Confirmar Contraseña *
                </label>
                <input
                    id="password_confirm"
                    type="password"
                    placeholder="••••••••"
                    disabled={isLoading}
                    className={`w-full rounded-md border bg-background px-3 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 ${errors.password_confirm ? 'border-destructive focus:ring-destructive' : 'border-input'
                        }`}
                    {...register('password_confirm')}
                />
                {errors.password_confirm && (
                    <p className="mt-1 text-xs text-destructive">{errors.password_confirm.message}</p>
                )}
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={isLoading || !isValid}
                className="w-full rounded-lg bg-background px-4 py-3 text-foreground shadow-md transition-all hover:bg-grey-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-grey-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-grey-600 disabled:hover:shadow-md dark:bg-grey-600 dark:hover:bg-grey-700"
            >
                {isLoading ? 'Registrando...' : 'Crear Cuenta'}
            </button>

            {/* Login Link */}
            <p className="text-center text-sm text-muted-foreground">
                ¿Ya tienes cuenta?{' '}
                <a href="/auth/login" className="font-medium text-primary hover:underline">
                    Iniciar sesión
                </a>
            </p>
        </form>
    );
}
