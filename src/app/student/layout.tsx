
import { AppShell } from "@/components/shared/app-shell";
import { StudentNav } from "@/lib/nav-links";
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

  return <AppShell nav={<StudentNav />} user={user}>{children}</AppShell>;
}
