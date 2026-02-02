'use client';

import { RegisterForm } from '@/components/auth/register-form';

export default function RegisterPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4">
            <div className="w-full max-w-md rounded-lg border border-border bg-card p-8 shadow-lg">
                <h1 className="mb-6 text-center text-2xl font-bold text-card-foreground">
                    Crear Cuenta
                </h1>

                <RegisterForm />
            </div>
        </div>
    );
}

