"use client";

import React, { useState } from 'react';
import { AppShell } from "@/components/shared/app-shell";
import { adminNavLinks, godAdminNavLinks } from "@/lib/nav-links";
import { PinLock } from "@/components/admin/pin-lock";
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isLocked, setIsLocked] = useState(true);
  // This would come from auth context in a real app
  const [isAdminRole, setIsAdminRole] = useState(true); 

  const user = {
    name: isAdminRole ? "Jane Doe" : "Super Admin",
    email: isAdminRole ? "jane.d@patel.edu" : "god.admin@patel.edu",
    avatar: PlaceHolderImages.find(p => p.id === 'admin-avatar-1')?.imageUrl || "https://picsum.photos/seed/301/100/100",
    role: isAdminRole ? "Admin" : "God Admin",
  };
  
  const navLinks = isAdminRole ? adminNavLinks : godAdminNavLinks;

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    window.location.href = '/';
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
