'use client';

import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-background">
            <div className="text-center max-w-md px-4">
                <AlertTriangle className="w-16 h-16 mx-auto mb-4 text-destructive" />
                <h2 className="text-2xl font-bold mb-4">Algo salió mal</h2>
                <p className="text-muted-foreground mb-6">
                    Por favor intenta de nuevo más tarde.
                </p>
                <div className="flex flex-col gap-3 items-center">
                    <button
                        onClick={() => reset()}
                        className="text-sm font-medium text-foreground hover:underline"
                    >
                        Intentar de nuevo
                    </button>
                    <Link
                        href="/"
                        className="text-sm font-medium text-foreground hover:underline"
                    >
                        Volver al inicio
                    </Link>
                </div>
            </div>
        </div>
    );
}