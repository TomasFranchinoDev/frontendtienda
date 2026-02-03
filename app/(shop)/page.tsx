import { Suspense } from 'react';
import Link from 'next/link';
import { getProducts, getShopConfig, getFeaturedProducts } from '@/lib/api';
import { ProductCard } from '@/components/ProductCard';
import { ArrowRight, Truck, Lock, Headphones, RotateCcw } from 'lucide-react';

export const metadata = {
    title: 'Home',
    description: 'Bienvenido a nuestra tienda',
};

export async function FeaturedProducts() {
    try {
        const featuredProducts = await getFeaturedProducts();

        if (!featuredProducts || featuredProducts.length === 0) {
            return (
                <div className="flex min-h-96 items-center justify-center rounded-lg border border-border bg-card/50">
                    <p className="text-lg text-muted-foreground">No hay productos destacados disponibles</p>
                </div>
            );
        }

        return (
            <div className="grid auto-rows-max grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
                {featuredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        );
    } catch (error) {
        console.error('Error fetching featured products:');
        return (
            <div className="flex min-h-96 items-center justify-center rounded-lg border border-destructive/20 bg-destructive/5">
                <p className="text-lg text-destructive">Error al cargar los productos destacados</p>
            </div>
        );
    }
}

async function HeroSection() {
    const config = await getShopConfig();

    return (
        <div
            className="relative overflow-hidden rounded-xl px-6 py-20 sm:px-12 lg:px-16"
            style={{
                background: `linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.8) 100%)`,
            }}
        >
            {/* Subtle pattern overlay */}
            <div className="absolute inset-0 opacity-10">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage:
                            'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 1px)',
                        backgroundSize: '40px 40px',
                    }}
                />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-2xl">
                <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
                    Bienvenido a {config.site_name}
                </h1>
                <p className="mt-4 text-lg text-white/90 sm:text-xl">
                    Descubre nuestra colección de productos seleccionados especialmente para ti.
                </p>

                {/* CTA Button */}
                <Link href="/products">
                    <button
                        className="mt-8 inline-flex items-center gap-2 rounded-lg px-6 py-3 font-semibold text-white transition-all hover:gap-3 hover:shadow-lg"
                        style={{
                            backgroundColor: `hsl(var(--secondary))`,
                        }}
                    >
                        Ver Catálogo
                        <ArrowRight className="h-5 w-5" />
                    </button>
                </Link>
            </div>
        </div>
    );
}

function HeroSkeleton() {
    return (
        <div className="relative overflow-hidden rounded-xl bg-muted px-6 py-20 sm:px-12 lg:px-16">
            <div className="max-w-2xl space-y-4">
                <div className="h-12 w-3/4 animate-pulse rounded-lg bg-muted-foreground/20" />
                <div className="h-6 w-full animate-pulse rounded-lg bg-muted-foreground/20" />
                <div className="h-6 w-2/3 animate-pulse rounded-lg bg-muted-foreground/20" />
                <div className="mt-8 h-12 w-48 animate-pulse rounded-lg bg-muted-foreground/20" />
            </div>
        </div>
    );
}

function FeaturedProductsSkeleton() {
    return (
        <div className="grid auto-rows-max grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="animate-pulse rounded-lg border border-border bg-card p-4">
                    <div className="aspect-square w-full rounded-md bg-muted" />
                    <div className="mt-4 h-4 w-3/4 rounded bg-muted" />
                    <div className="mt-2 h-3 w-1/2 rounded bg-muted" />
                </div>
            ))}
        </div>
    );
}

export default async function HomePage() {
    return (
        <div className="w-full">
            {/* Hero Section */}
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <Suspense fallback={<HeroSkeleton />}>
                    <HeroSection />
                </Suspense>
            </div>

            {/* Trust Badges Section */}
            <div className="mx-auto w-full px-4 py-12 sm:px-6 sm:py-16 lg:max-w-7xl lg:px-8">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 gap-5 lg:grid-cols-4 lg:gap-6">
                    {/* Fast Shipping */}
                    <div className="group relative overflow-hidden rounded-lg sm:rounded-xl border border-border bg-gradient-to-br from-card to-card/50 p-4 sm:p-6 transition-all duration-300 hover:shadow-lg hover:border-primary/50">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        <div className="relative z-10 flex gap-3 sm:gap-4">
                            <div className="flex h-12 sm:h-14 w-12 sm:w-14 shrink-0 items-center justify-center rounded-lg sm:rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 transition-all duration-300 group-hover:from-primary/30 group-hover:to-primary/20 group-hover:scale-110">
                                <Truck className="h-6 sm:h-7 w-6 sm:w-7 text-primary transition-transform duration-300 group-hover:scale-110" />
                            </div>
                            <div className="flex min-w-0 flex-col justify-center">
                                <h3 className="text-sm sm:text-base font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">Envío Rápido</h3>
                                <p className="text-xs sm:text-sm text-muted-foreground transition-colors duration-300 group-hover:text-muted-foreground/80 line-clamp-2">
                                    Envios a todo el pais
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Secure Payment */}
                    <div className="group relative overflow-hidden rounded-lg sm:rounded-xl border border-border bg-gradient-to-br from-card to-card/50 p-4 sm:p-6 transition-all duration-300 hover:shadow-lg hover:border-primary/50">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        <div className="relative z-10 flex gap-3 sm:gap-4">
                            <div className="flex h-12 sm:h-14 w-12 sm:w-14 shrink-0 items-center justify-center rounded-lg sm:rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 transition-all duration-300 group-hover:from-primary/30 group-hover:to-primary/20 group-hover:scale-110">
                                <Lock className="h-6 sm:h-7 w-6 sm:w-7 text-primary transition-transform duration-300 group-hover:scale-110" />
                            </div>
                            <div className="flex min-w-0 flex-col justify-center">
                                <h3 className="text-sm sm:text-base font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">Pago Seguro</h3>
                                <p className="text-xs sm:text-sm text-muted-foreground transition-colors duration-300 group-hover:text-muted-foreground/80 line-clamp-2">
                                    Transacciones encriptadas
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Customer Support */}
                    <div className="group relative overflow-hidden rounded-lg sm:rounded-xl border border-border bg-gradient-to-br from-card to-card/50 p-4 sm:p-6 transition-all duration-300 hover:shadow-lg hover:border-primary/50">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        <div className="relative z-10 flex gap-3 sm:gap-4">
                            <div className="flex h-12 sm:h-14 w-12 sm:w-14 shrink-0 items-center justify-center rounded-lg sm:rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 transition-all duration-300 group-hover:from-primary/30 group-hover:to-primary/20 group-hover:scale-110">
                                <Headphones className="h-6 sm:h-7 w-6 sm:w-7 text-primary transition-transform duration-300 group-hover:scale-110" />
                            </div>
                            <div className="flex min-w-0 flex-col justify-center">
                                <h3 className="text-sm sm:text-base font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">Soporte 24/7</h3>
                                <p className="text-xs sm:text-sm text-muted-foreground transition-colors duration-300 group-hover:text-muted-foreground/80 line-clamp-2">
                                    Equipo listo para ayudarte
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Easy Returns */}
                    <div className="group relative overflow-hidden rounded-lg sm:rounded-xl border border-border bg-gradient-to-br from-card to-card/50 p-4 sm:p-6 transition-all duration-300 hover:shadow-lg hover:border-primary/50">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        <div className="relative z-10 flex gap-3 sm:gap-4">
                            <div className="flex h-12 sm:h-14 w-12 sm:w-14 shrink-0 items-center justify-center rounded-lg sm:rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 transition-all duration-300 group-hover:from-primary/30 group-hover:to-primary/20 group-hover:scale-110">
                                <RotateCcw className="h-6 sm:h-7 w-6 sm:w-7 text-primary transition-transform duration-300 group-hover:scale-110" />
                            </div>
                            <div className="flex min-w-0 flex-col justify-center">
                                <h3 className="text-sm sm:text-base font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">Devoluciones Fáciles</h3>
                                <p className="text-xs sm:text-sm text-muted-foreground transition-colors duration-300 group-hover:text-muted-foreground/80 line-clamp-2">
                                    30 días habiles para devoluciones
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Featured Products Section */}
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="mb-12">
                    <h2 className="text-3xl font-bold text-foreground">Productos Destacados</h2>
                    <p className="mt-2 text-muted-foreground">
                        Explora algunos de nuestros productos más populares
                    </p>
                </div>

                <Suspense fallback={<FeaturedProductsSkeleton />}>
                    <FeaturedProducts />
                </Suspense>

                {/* Link to full catalog */}
                <div className="mt-12 flex justify-center">
                    <Link href="/products">
                        <button className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-8 py-3 font-semibold text-foreground transition-all hover:bg-accent hover:text-accent-foreground hover:gap-3">
                            Ver todos los productos
                            <ArrowRight className="h-5 w-5" />
                        </button>
                    </Link>
                </div>
            </div>

            {/* Why Shop With Us Section */}
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="rounded-xl border border-border bg-card p-8 sm:p-12">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl font-bold text-foreground">
                            ¿Por Qué Comprar Aquí?
                        </h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                            Nos comprometemos a ofrecerte la mejor experiencia de compra en línea con productos de calidad, precios justos y un servicio excepcional.
                        </p>
                    </div>

                    <div className="mt-8 grid gap-6 sm:grid-cols-2">
                        <div>
                            <h3 className="font-semibold text-foreground">✓ Productos de Calidad</h3>
                            <p className="mt-2 text-sm text-muted-foreground">
                                Cada artículo es cuidadosamente seleccionado por nuestro equipo
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-foreground">✓ Precios Competitivos</h3>
                            <p className="mt-2 text-sm text-muted-foreground">
                                Ofrecemos los mejores precios sin comprometer calidad
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-foreground">✓ Seguridad Garantizada</h3>
                            <p className="mt-2 text-sm text-muted-foreground">
                                Tus datos están protegidos con encriptación SSL/TLS
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-foreground">✓ Compras Fáciles</h3>
                            <p className="mt-2 text-sm text-muted-foreground">
                                Interfaz intuitiva y proceso de checkout simplificado
                            </p>
                        </div>
                    </div>

                    <div className="mt-8 flex gap-3">
                        <Link href="/about">
                            <button className="rounded-lg border border-border bg-background px-6 py-2 font-semibold text-foreground transition-all hover:bg-accent hover:text-accent-foreground">
                                Conócenos
                            </button>
                        </Link>
                        <Link href="/legal/privacidad">
                            <button className="rounded-lg border border-border bg-background px-6 py-2 font-semibold text-foreground transition-all hover:bg-accent hover:text-accent-foreground">
                                Políticas
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
