"use client";

import { useEffect, useState } from 'react';
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
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userRole = localStorage.getItem('userRole');

    if (isLoggedIn && userRole && (pathname === '/' || pathname.startsWith('/login'))) {
      const dashboardUrl = userRole === 'teacher' ? `/${userRole}/attendance` : `/${userRole}/dashboard`;
      router.replace(dashboardUrl);
    } else {
      const timer = setTimeout(() => setLoading(false), 150);
      return () => clearTimeout(timer);
    }
  }, [pathname, router]);

  if (loading && (pathname === '/' || pathname.startsWith('/login'))) {
    return (
      <html lang="en" suppressHydrationWarning>
        <head>
            <title>Patel College Hub</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
            <meta name="description" content="Your one-stop portal for college activities." />
            <meta name="theme-color" content="#4B0082" />
            <link rel="manifest" href="/manifest.json" />
        </head>
        <body className="flex min-h-screen items-center justify-center bg-background">
            <Loader />
        </body>
      </html>
    );
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Patel College Hub</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="description" content="Your one-stop portal for college activities." />
        <meta name="theme-color" content="#4B0082" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn("font-body antialiased", fontInter.variable)}>
        {children}
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
