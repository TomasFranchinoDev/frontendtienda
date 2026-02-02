'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { passwordResetConfirmSchema, PasswordResetConfirmData } from '@/schemas/auth';
import { PasswordStrength } from './password-strength';
import { ApiError, apiConfirmPasswordReset } from '@/lib/api';

interface PasswordResetFormProps {
    token: string;
    onSuccess?: () => void;
}

/**
 * PasswordResetForm Component
 * 
 * Features:
 * - React Hook Form + Zod validation
 * - Real-time password strength indicator
 * - Token validation
 * - Field-level error messages
 */
export function PasswordResetForm({ token, onSuccess }: PasswordResetFormProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState('');

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isValid },
        reset,
    } = useForm<PasswordResetConfirmData>({
        resolver: zodResolver(passwordResetConfirmSchema),
        mode: 'onChange',
        defaultValues: {
            token: token,
        },
    });

    const newPasswordValue = watch('new_password', '');

    const onSubmit = async (data: PasswordResetConfirmData) => {
        setApiError('');
        setIsLoading(true);

        try {
            await apiConfirmPasswordReset(token, data.new_password);
            reset();
            onSuccess?.();
            // Redirect to login after 2 seconds
            setTimeout(() => {
                router.push('/auth/login');
            }, 2000);
        } catch (err) {
            let message = 'Error al actualizar la contraseña';

            if (err instanceof ApiError) {
                message = err.message || message;

                // Handle specific error messages
                if (message.includes('Token')) {
                    message = 'El link de recuperación es inválido o expiró. Solicita uno nuevo.';
                } else if (message.includes('Contraseña')) {
                    message = err.message;
                } else {
                    message = 'No pudimos actualizar tu contraseña. Intenta de nuevo.';
                }
            } else if (err instanceof Error) {
                message = err.message;
            }

            setApiError(message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            {/* Hidden token field */}
            <input type="hidden" {...register('token')} value={token} />

            {/* API Error Alert */}
            {apiError && (
                <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                    {apiError}
                </div>
            )}

            {/* New Password Field with Strength Indicator */}
            <div>
                <label htmlFor="new_password" className="block text-sm font-medium text-card-foreground mb-2">
                    Nueva Contraseña *
                </label>
                <input
                    id="new_password"
                    type="password"
                    placeholder="••••••••"
                    disabled={isLoading}
                    className={`w-full rounded-md border bg-background px-3 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 ${errors.new_password ? 'border-destructive focus:ring-destructive' : 'border-input'
                        }`}
                    {...register('new_password')}
                />
                {errors.new_password && (
                    <p className="mt-1 text-xs text-destructive">{errors.new_password.message}</p>
                )}

                {/* Password Strength Component */}
                <div className="mt-3">
                    <PasswordStrength password={newPasswordValue} />
                </div>
            </div>

            {/* Confirm Password Field */}
            <div>
                <label htmlFor="new_password_confirm" className="block text-sm font-medium text-card-foreground mb-2">
                    Confirmar Contraseña *
                </label>
                <input
                    id="new_password_confirm"
                    type="password"
                    placeholder="••••••••"
                    disabled={isLoading}
                    className={`w-full rounded-md border bg-background px-3 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 ${errors.new_password_confirm ? 'border-destructive focus:ring-destructive' : 'border-input'
                        }`}
                    {...register('new_password_confirm')}
                />
                {errors.new_password_confirm && (
                    <p className="mt-1 text-xs text-destructive">{errors.new_password_confirm.message}</p>
                )}
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={isLoading || !isValid}
                className="w-full rounded-lg bg-background px-4 py-3 text-foreground shadow-md transition-all hover:bg-grey-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-grey-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-grey-600 disabled:hover:shadow-md dark:bg-grey-600 dark:hover:bg-grey-700"
            >
                {isLoading ? 'Actualizando...' : 'Actualizar Contraseña'}
            </button>
        </form>
    );
}
