"use client";

import { AppShell } from "@/components/shared/app-shell";
import { teacherNavLinks } from "@/lib/nav-links";
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = {
    name: "Dr. Evelyn Reed",
    email: "e.reed@patel.edu",
    avatar: PlaceHolderImages.find(p => p.id === 'teacher-avatar-1')?.imageUrl || "https://picsum.photos/seed/201/100/100",
    role: "Teacher",
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    window.location.href = '/';
  };

  return <AppShell navLinks={teacherNavLinks} user={user} onLogout={handleLogout}>{children}</AppShell>;
}
