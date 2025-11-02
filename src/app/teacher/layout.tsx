"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AppShell } from "@/components/shared/app-shell";
import { teacherNavLinks } from "@/lib/nav-links";
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userRole = localStorage.getItem('userRole');
    if (isLoggedIn !== 'true' || userRole !== 'teacher') {
      router.replace('/login?role=teacher');
    }
  }, [router]);

  const user = {
    name: "Dr. Evelyn Reed",
    email: "e.reed@patel.edu",
    avatar: PlaceHolderImages.find(p => p.id === 'teacher-avatar-1')?.imageUrl || "https://picsum.photos/seed/201/100/100",
    role: "Teacher",
  };

  return <AppShell navLinks={teacherNavLinks} user={user}>{children}</AppShell>;
}
