'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, Search, X } from 'lucide-react';
import type { ShopConfig } from '@/types';
import { ThemeToggle } from './theme-toggle';
import { UserNav } from './user-nav';
import { CartSheet } from '@/components/CartSheet';
import { resolveLogoUrl } from '@/lib/media';


interface MainNavbarProps {
    config: ShopConfig | null;
}

export function MainNavbar({ config }: MainNavbarProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();
    const pathname = usePathname();

    // Hide search in navbar if we're already on products page
    const isProductsPage = pathname.startsWith('/products');

    const siteName = config?.site_name || 'Tienda';

    const navLinks = [
        { href: '/', label: 'Inicio' },
        { href: '/products', label: 'Catálogo' },
    ];

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
            setSearchQuery('');
            setSearchOpen(false);
        }
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="mx-auto flex h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
                {/* Mobile Menu Button */}
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="inline-flex items-center justify-center rounded-md p-2 text-foreground transition-all hover:bg-primary/10 hover:text-primary lg:hidden"
                    aria-label="Menu"
                >
                    {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>

                {/* Logo */}
                <Link href="/" className="flex shrink-0 items-center gap-2">
                    {config?.logo_url ? (
                        <div className="relative h-10 w-10 rounded-lg overflow-hidden">
                            <Image
                                src={resolveLogoUrl(config?.logo_url) || ''}
                                alt={siteName}
                                fill
                                className="object-contain"
                            />
                        </div>
                    ) : null}
                    <span className="text-lg font-bold text-foreground hidden sm:inline">{siteName}</span>
                    {!config?.logo_url && (
                        <span className="text-xl font-bold text-foreground sm:hidden">{siteName}</span>
                    )}
                </Link>

                {/* Centered Search - Appears from md up (hidden on products page) */}
                {!isProductsPage && (
                    <form
                        onSubmit={handleSearch}
                        className="hidden md:flex flex-1 items-center justify-center"
                    >
                        <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 focus-within:ring-1 focus-within:ring-primary w-full max-w-xs">
                            <input
                                type="text"
                                placeholder="Buscar productos..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-transparent text-sm placeholder-muted-foreground outline-none"
                            />
                            <button
                                type="submit"
                                className="text-foreground transition-all hover:text-primary hover:scale-110"
                                aria-label="Buscar"
                            >
                                <Search className="h-4 w-4" />
                            </button>
                        </div>
                    </form>
                )}

                {/* Desktop Navigation - After Search */}
                <nav className="hidden lg:flex lg:gap-6 shrink-0">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-sm font-medium text-foreground transition-all hover:text-primary hover:scale-105"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Right Actions */}
                <div className="flex shrink-0 items-center gap-2">
                    {/* Search - Mobile Toggle Button (hidden on products page) */}
                    {!isProductsPage && (
                        <button
                            onClick={() => setSearchOpen(!searchOpen)}
                            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-foreground transition-all hover:bg-primary/10 hover:text-primary"
                            aria-label="Buscar"
                        >
                            <Search className="h-5 w-5" />
                        </button>
                    )}

                    {/* Theme Toggle */}
                    <ThemeToggle />

                    {/* User Nav */}
                    <UserNav />

                    {/* Cart Sheet */}
                    <CartSheet />
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <>
                    <div
                        className="fixed top-16 inset-0 z-30 bg-black/50 lg:hidden"
                        onClick={() => setMobileMenuOpen(false)}
                    />
                    <div className="fixed top-16 left-0 right-0 z-40 max-h-[calc(100vh-64px)] w-screen overflow-y-auto border-b border-border bg-background shadow-xl lg:hidden">
                        <nav className="flex flex-col gap-2 p-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="flex items-center justify-center rounded-lg border-2 border-border bg-card/50 px-4 py-3 text-base font-semibold text-foreground transition-all hover:border-primary hover:bg-primary/10"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </div>
                </>
            )}

            {/* Mobile Search (hidden on products page) */}
            {searchOpen && !isProductsPage && (
                <div className="border-t border-border bg-card p-4 md:hidden">
                    <form onSubmit={handleSearch} className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Buscar productos..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm placeholder-muted-foreground outline-none focus:ring-1 focus:ring-primary"
                            autoFocus
                        />
                        <button
                            type="submit"
                            className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
                        >
                            <Search className="h-5 w-5" />
                        </button>
                    </form>
                </div>
            )}
        </header>
    );
}
