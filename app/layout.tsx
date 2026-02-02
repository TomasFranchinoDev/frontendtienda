import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { getShopConfig } from "@/lib/api";
import type { ShopConfig } from "@/types";
import { MainNavbar } from "@/components/layout/navbar";
import { SiteFooter } from "@/components/layout/footer";
import { AuthInitializer } from "@/components/AuthInitializer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const config = await safeLoadConfig();

  return {
    title: config.site_name,
    description: `Compra en ${config.site_name}`,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const config = await safeLoadConfig();
  const cssVars = buildCssVars(config);

  return (
    <html lang="en">
      <body
        style={cssVars}
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthInitializer />
        <MainNavbar config={config} />
        <main className="min-h-screen">{children}</main>
        <SiteFooter config={config} />
      </body>
    </html>
  );
}

async function safeLoadConfig(): Promise<ShopConfig> {
  try {
    return await getShopConfig();
  } catch (error) {
    return {
      site_name: "Tienda",
      primary_color: "#0F172A",
      secondary_color: "#2563EB",
      social_links: {},
    };
  }
}

function hexToHSL(hex: string): string {
  // Remove the hash if present
  hex = hex.replace(/^#/, '');

  // Parse hex to RGB
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  // Return as HSL string without the hsl() wrapper for CSS variables
  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

function buildCssVars(config: ShopConfig): CSSProperties {
  const vars: Record<string, string> = {};

  if (config.primary_color) {
    vars["--primary"] = hexToHSL(config.primary_color);
  }
  if (config.secondary_color) {
    vars["--secondary"] = hexToHSL(config.secondary_color);
  }
  return vars as CSSProperties;
}
