import { notFound } from 'next/navigation';
import { getProductBySlug } from '@/lib/api';
import { ProductDetailClient } from './client';
import type { ProductDetail } from '@/types';


interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
    const { slug } = await params;
    try {
        const product = await getProductBySlug(slug);
        return {
            title: product?.seo_title || product?.name,
            description: product?.seo_description || product?.description,
        };
    } catch {
        return {
            title: 'Producto',
            description: 'Detalle del producto',
        };
    }
}

export default async function ProductPage({ params }: PageProps) {
    const { slug } = await params;

    try {
        const product = await getProductBySlug(slug);
        if (!product) {
            notFound();
        }

        return (
            <div className="w-full">
                <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                    <ProductDetailClient product={product} />
                </div>
            </div>
        );
    } catch (error) {
        console.error('Error fetching product:', error);
        notFound();
    }
}
