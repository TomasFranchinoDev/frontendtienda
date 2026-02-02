import { Suspense } from 'react';
import { CheckoutSuccessContent } from './checkout-success-content';
import { Loader2 } from 'lucide-react';

function CheckoutSuccessSkeleton() {
    return (
        <div className="flex min-h-screen items-center justify-center px-4">
            <div className="w-full max-w-md rounded-lg border border-border bg-card p-8 text-center">
                <Loader2 className="mx-auto mb-6 h-16 w-16 animate-spin text-primary" />
                <div className="h-8 w-2/3 animate-pulse rounded bg-muted mx-auto mb-4" />
                <div className="h-4 w-full animate-pulse rounded bg-muted" />
            </div>
        </div>
    );
}

export default function CheckoutSuccessPage() {
    return (
        <Suspense fallback={<CheckoutSuccessSkeleton />}>
            <CheckoutSuccessContent />
        </Suspense>
    );
}
