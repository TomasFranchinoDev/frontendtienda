import { notFound } from 'next/navigation';
import { getProductBySlug } from '@/lib/api';
import { ProductDetailClient } from './client';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
    const { slug } = await params;

    try {
        const product = await getProductBySlug(slug);
        return {
            title: product.seo_title || product.name,
            description: product.seo_description || product.description,
        };
    } catch {
        return { title: 'Producto no encontrado' };
    }
}

export default async function ProductPage({ params }: PageProps) {
    const { slug } = await params;

    try {
        const product = await getProductBySlug(slug);
        return <ProductDetailClient product={product} />;
    } catch (error) {
        console.error('Error fetching product');
        notFound();
    }
}
