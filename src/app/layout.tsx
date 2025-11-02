"use client";

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";

const fontInter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

// Since we are using client-side hooks, we can't export metadata directly.
// This is a known limitation when a layout needs to be a client component.
// export const metadata: Metadata = {
//   title: "Patel College Hub",
//   description: "Your one-stop portal for college activities.",
//   manifest: "/manifest.json",
// };

function RootLayoutContent({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // This effect runs on the client and handles redirection based on login state.
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userRole = localStorage.getItem('userRole');

    // If there's a logged-in user and they are on the root or login page, redirect them to their dashboard.
    if (isLoggedIn && userRole && (pathname === '/' || pathname.startsWith('/login'))) {
      const dashboardUrl = userRole === 'teacher' ? `/${userRole}/attendance` : `/${userRole}/dashboard`;
      router.replace(dashboardUrl);
    }
  }, [pathname, router]);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Patel College Hub</title>
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
