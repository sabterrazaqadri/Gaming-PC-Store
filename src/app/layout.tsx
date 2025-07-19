import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { sanityClient } from '@/app/lib/sanity'
import { categoriesQuery } from '@/app/lib/queries'
import HeaderClient from '@/components/header-client'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gaming Store - Ultimate Gaming Experience",
  description: "Discover the latest gaming gear, PCs, and accessories. Your ultimate destination for gaming excellence.",
  keywords: "gaming, PC, accessories, gaming store, gaming gear",
  authors: [{ name: "Gaming Store Team" }],
  viewport: "width=device-width, initial-scale=1",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch categories from Sanity
  const categories = await sanityClient.fetch(categoriesQuery)

  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased animated-bg min-h-screen`}
      >
        {/* Use HeaderClient and pass categories */}
        <HeaderClient categories={categories} />
        {children}
      </body>
    </html>
  );
}
