import { Suspense } from 'react';
import { LoginForm } from './login-form';

function LoginSkeleton() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4">
            <div className="w-full max-w-md rounded-lg border border-border bg-card p-8 shadow-lg">
                <div className="mb-6 h-8 w-2/3 animate-pulse rounded bg-muted" />
                <div className="space-y-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="h-10 w-full animate-pulse rounded bg-muted" />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={<LoginSkeleton />}>
            <LoginForm />
        </Suspense>
    );
}
