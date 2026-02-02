'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { ArrowUpDown } from 'lucide-react';

export default function ProductSorter() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const currentOrder = searchParams.get('ordering') || '-created_at';

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const params = new URLSearchParams(searchParams);

        // Reset page to 1 when changing sort
        params.set('page', '1');

        if (e.target.value) {
            params.set('ordering', e.target.value);
        } else {
            params.delete('ordering');
        }

        replace(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <ArrowUpDown className="h-4 w-4" />
                <span>Ordenar:</span>
            </div>
            <select
                value={currentOrder}
                onChange={handleSortChange}
                className="rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors hover:border-input/80 focus:border-primary focus:ring-1 focus:ring-primary"
            >
                <option value="-created_at">Más Recientes</option>
                <option value="price">Precio: Menor a Mayor</option>
                <option value="-price">Precio: Mayor a Menor</option>
            </select>
        </div>
    );
}
