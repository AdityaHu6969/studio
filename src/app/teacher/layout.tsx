
import { AppShell } from "@/components/shared/app-shell";
import { TeacherNav } from "@/lib/nav-links.tsx";
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

  return <AppShell nav={<TeacherNav />} user={user}>{children}</AppShell>;
}
