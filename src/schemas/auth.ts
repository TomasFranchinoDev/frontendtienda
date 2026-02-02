import { z } from 'zod';

/**
 * Shared password validation schema
 * 
 * Requirements:
 * - Minimum 8 characters
 * - At least one uppercase letter
 * - At least one lowercase letter
 * - At least one digit
 * - At least one special character
 */
export const passwordSchema = z
    .string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .regex(/[A-Z]/, 'Debe contener al menos una letra mayúscula')
    .regex(/[a-z]/, 'Debe contener al menos una letra minúscula')
    .regex(/\d/, 'Debe contener al menos un número')
    .regex(
        /[!@#$%^&*()_+\-=\[\]{};:'",.< >?/\\|`~]/,
        'Debe contener al menos un carácter especial (!@#$%^&*, etc.)'
    );

/**
 * Email validation schema
 * Checks format but NOT disposable emails (handled on backend)
 */
export const emailSchema = z
    .string()
    .email('Formato de email inválido')
    .toLowerCase();

/**
 * Register Form Schema
 */
export const registerSchema = z
    .object({
        email: emailSchema,
        username: z
            .string()
            .min(3, 'El usuario debe tener al menos 3 caracteres')
            .max(30, 'El usuario no puede exceder 30 caracteres')
            .regex(/^[a-zA-Z0-9_-]+$/, 'El usuario solo puede contener letras, números, guiones y guiones bajos'),
        first_name: z
            .string()
            .min(1, 'El nombre es requerido')
            .max(50, 'El nombre no puede exceder 50 caracteres'),
        last_name: z
            .string()
            .min(1, 'El apellido es requerido')
            .max(50, 'El apellido no puede exceder 50 caracteres'),
        password: passwordSchema,
        password_confirm: z.string(),
    })
    .refine((data) => data.password === data.password_confirm, {
        message: 'Las contraseñas no coinciden',
        path: ['password_confirm'],
    });

export type RegisterFormData = z.infer<typeof registerSchema>;

/**
 * Password Reset Request Schema
 * (Requesting password reset token)
 */
export const passwordResetRequestSchema = z.object({
    email: emailSchema,
});

export type PasswordResetRequestData = z.infer<typeof passwordResetRequestSchema>;

/**
 * Password Reset Confirm Schema
 * (Confirming with token and new password)
 */
export const passwordResetConfirmSchema = z
    .object({
        token: z
            .string()
            .min(50, 'Token inválido')
            .max(255, 'Token inválido'),
        new_password: passwordSchema,
        new_password_confirm: z.string(),
    })
    .refine((data) => data.new_password === data.new_password_confirm, {
        message: 'Las contraseñas no coinciden',
        path: ['new_password_confirm'],
    });

export type PasswordResetConfirmData = z.infer<typeof passwordResetConfirmSchema>;

/**
 * Login Schema
 * (No password strength requirements for login)
 */
export const loginSchema = z.object({
    email: emailSchema,
    password: z.string().min(1, 'La contraseña es requerida'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
