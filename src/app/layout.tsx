
"use client";

import { Suspense, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { Loader } from '@/components/shared/loader';

function RootLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userRole = localStorage.getItem('userRole');
    
    const isAuthPage = pathname === '/' || pathname.startsWith('/login') || pathname.startsWith('/set-password') || pathname.startsWith('/otp-verify');

    if (!isLoggedIn && !isAuthPage) {
      router.replace('/');
    } else if (isLoggedIn && userRole) {
      const expectedPath = `/${userRole}`;
      if (!pathname.startsWith(expectedPath) && !isAuthPage) {
         const dashboardUrl = userRole === 'teacher' ? `/${userRole}/attendance` : `/${userRole}/dashboard`;
         router.push(dashboardUrl);
      } else {
        setIsVerified(true);
      }
    } else {
      setIsVerified(true);
    }
  }, [pathname, router]);

  if (!isVerified) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background"><Loader /></div>
    );
  }

  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-background"><Loader /></div>}>
        {children}
    </Suspense>
  );
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Patel College Hub</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Your one-stop portal for college activities." />
        <meta name="theme-color" content="#4B0082" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon-192x192.png"></link>
      </head>
      <body className={cn("font-body antialiased bg-background text-foreground")}>
        <RootLayoutContent>{children}</RootLayoutContent>
        <Toaster />
      </body>
    </html>
  );
}
