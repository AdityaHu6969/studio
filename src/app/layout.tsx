import { Inter } from 'next/font/google';
import { Suspense } from 'react';
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { Loader } from '@/components/shared/loader';
import { RootLayoutContent } from '@/components/shared/root-layout-content';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn(inter.variable)}>
      <head>
        <title>Patel College Hub</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Your one-stop portal for college activities." />
        <meta name="theme-color" content="#4B0082" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon-192x192.png"></link>
      </head>
      <body className={cn("font-body antialiased bg-background text-foreground")}>
        <RootLayoutContent>
          <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-background"><Loader /></div>}>
              {children}
          </Suspense>
        </RootLayoutContent>
        <Toaster />
      </body>
    </html>
  );
}
