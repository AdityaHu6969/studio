"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AppShell } from "@/components/shared/app-shell";
import { adminNavLinks, godAdminNavLinks } from "@/lib/nav-links";
import { PinLock } from "@/components/admin/pin-lock";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isLocked, setIsLocked] = useState(true);
  // This would come from auth context in a real app
  const [isAdminRole, setIsAdminRole] = useState(true); 

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userRole = localStorage.getItem('userRole');
    if (isLoggedIn !== 'true' || userRole !== 'admin') {
      router.replace('/login?role=admin');
    }
  }, [router]);

  const user = {
    name: isAdminRole ? "Jane Doe" : "Super Admin",
    email: isAdminRole ? "jane.d@patel.edu" : "god.admin@patel.edu",
    avatar: "https://picsum.photos/seed/301/100/100",
    role: isAdminRole ? "Admin" : "God Admin",
  };
  
  const navLinks = isAdminRole ? adminNavLinks : godAdminNavLinks;

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    router.push('/');
  };

  return (
    <>
      <PinLock isOpen={isLocked} onUnlock={() => setIsLocked(false)} />
      {!isLocked && (
        <AppShell navLinks={navLinks} user={user} onLogout={handleLogout}>
          {children}
        </AppShell>
      )}
    </>
  );
}
