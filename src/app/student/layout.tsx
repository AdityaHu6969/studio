"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AppShell } from "@/components/shared/app-shell";
import { studentNavLinks } from "@/lib/nav-links";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userRole = localStorage.getItem('userRole');
    if (isLoggedIn !== 'true' || userRole !== 'student') {
      router.replace('/login?role=student');
    }
  }, [router]);
  
  const user = {
    name: "Alex Johnson",
    email: "alex.j@example.com",
    avatar: "https://picsum.photos/seed/101/100/100",
    role: "Student",
  };

  return <AppShell navLinks={studentNavLinks} user={user}>{children}</AppShell>;
}
