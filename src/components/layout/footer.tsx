import Link from 'next/link';
import { Instagram, Facebook, Phone, Mail } from 'lucide-react';
import type { ShopConfig } from '@/types';

interface SiteFooterProps {
    config: ShopConfig | null;
}

export function SiteFooter({ config }: SiteFooterProps) {
    const currentYear = new Date().getFullYear();
    const siteName = config?.site_name || 'Tienda';

    // Map social link keys to icons
    const socialIcons: Record<string, React.ComponentType<{ className?: string }>> = {
        instagram: Instagram,
        facebook: Facebook,
        whatsapp: Phone,
        email: Mail,
    };

    const socialLinks = config?.social_links || {};

    return (
        <footer className="border-t border-border bg-background">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-4">
                    {/* Brand Column */}
                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold text-foreground">{siteName}</h3>
                        <p className="text-sm text-muted-foreground">
                            Tu tienda de confianza para productos de calidad.
                        </p>
                        <p className="text-xs text-muted-foreground">
                            © {currentYear} {siteName}. Todos los derechos reservados.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-3">
                        <h4 className="text-sm font-semibold text-foreground">Enlaces Rápidos</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/"
                                    className="text-sm text-muted-foreground hover:text-foreground"
                                >
                                    Inicio
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/products"
                                    className="text-sm text-muted-foreground hover:text-foreground"
                                >
                                    Catálogo
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/about"
                                    className="text-sm text-muted-foreground hover:text-foreground"
                                >
                                    Sobre Nosotros
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div className="space-y-3">
                        <h4 className="text-sm font-semibold text-foreground">Legal</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/legal/privacidad"
                                    className="text-sm text-muted-foreground hover:text-foreground"
                                >
                                    Política de Privacidad
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/legal/terminos"
                                    className="text-sm text-muted-foreground hover:text-foreground"
                                >
                                    Términos y Condiciones
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/legal/envios-devoluciones"
                                    className="text-sm text-muted-foreground hover:text-foreground"
                                >
                                    Envíos y Devoluciones
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Social Media & Contact */}
                    <div className="space-y-3">
                        <h4 className="text-sm font-semibold text-foreground">Síguenos</h4>
                        <div className="flex gap-3">
                            {Object.entries(socialLinks).map(([key, value]) => {
                                const Icon = socialIcons[key.toLowerCase()];
                                if (!Icon || !value) return null;

                                // Handle different link types
                                let href = value;
                                if (key.toLowerCase() === 'whatsapp') {
                                    href = `https://wa.me/${value.replace(/[^0-9]/g, '')}`;
                                } else if (key.toLowerCase() === 'email') {
                                    href = `mailto:${value}`;
                                } else if (!value.startsWith('http')) {
                                    href = `https://${value}`;
                                }

                                return (
                                    <a
                                        key={key}
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background text-muted-foreground hover:bg-accent hover:text-foreground"
                                        aria-label={key}
                                    >
                                        <Icon className="h-4 w-4" />
                                    </a>
                                );
                            })}
                        </div>

                        {config?.contact_email && (
                            <div className="mt-4">
                                <p className="text-xs text-muted-foreground">Contacto:</p>
                                <a
                                    href={`mailto:${config.contact_email}`}
                                    className="text-sm text-foreground hover:underline"
                                >
                                    {config.contact_email}
                                </a>
                            </div>
                        )}
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-8 border-t border-border pt-8 text-center">
                    <p className="text-xs text-muted-foreground">
                        Diseñado para nuestros clientes mas exigentes.
                    </p>
                </div>
            </div>
        </footer>
    );
}
