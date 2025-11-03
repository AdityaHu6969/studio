"use client";

import { AppShell } from "@/components/shared/app-shell";
import { studentNavLinks } from "@/lib/nav-links";
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = {
    name: "Alex Johnson",
    email: "alex.j@example.com",
    avatar: PlaceHolderImages.find(p => p.id === 'student-avatar-1')?.imageUrl || "https://picsum.photos/seed/101/100/100",
    role: "Student",
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    window.location.href = '/';
  };

  return <AppShell navLinks={studentNavLinks} user={user} onLogout={handleLogout}>{children}</AppShell>;
}
