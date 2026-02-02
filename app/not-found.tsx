import Link from 'next/link';
import { FileQuestion } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-background">
            <div className="text-center max-w-md px-4">
                <FileQuestion className="w-20 h-20 mx-auto mb-4 text-muted-foreground" />
                <h1 className="text-6xl font-bold mb-2">404</h1>
                <h2 className="text-xl font-semibold mb-4">
                    Página no encontrada
                </h2>
                <p className="text-muted-foreground mb-6">
                    La página que buscas no existe.
                </p>
                <Link
                    href="/"
                    className="text-sm font-medium text-grey hover:underline"
                >
                    Volver al inicio
                </Link>
            </div>
        </div>
    );
}