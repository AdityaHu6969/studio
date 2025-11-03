"use client";

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Loader } from '@/components/shared/loader';

export function RootLayoutContent({ children }: { children: React.ReactNode }) {
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

  return <>{children}</>;
}
