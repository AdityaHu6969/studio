"use client";

import { useEffect, useState, Suspense } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { Loader } from '@/components/shared/loader';

const fontInter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

function RootLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(pathname === '/' || pathname.startsWith('/login'));

  useEffect(() => {
    // This effect handles showing the loader on initial auth pages,
    // but we let the nested layouts/pages handle their own redirects and content switching.
    // The main purpose is to avoid a flash of unstyled or incorrect content.
    const isAuthPage = pathname === '/' || pathname.startsWith('/login');
    setLoading(isAuthPage);
  }, [pathname]);

  // A suspense boundary can be useful here if children trigger suspense
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Patel College Hub</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Your one-stop portal for college activities." />
        <meta name="theme-color" content="#4B0082" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={cn("font-body antialiased", fontInter.variable)}>
        <Suspense fallback={<body className="flex min-h-screen items-center justify-center bg-background"><Loader /></body>}>
          {children}
        </Suspense>
        <Toaster />
      </body>
    </html>
  );
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <RootLayoutContent>{children}</RootLayoutContent>;
}
