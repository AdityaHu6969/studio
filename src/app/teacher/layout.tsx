import { AppShell } from "@/components/shared/app-shell";
import { teacherNavLinks } from "@/lib/nav-links";

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = {
    name: "Dr. Evelyn Reed",
    email: "e.reed@patel.edu",
    avatar: "https://picsum.photos/seed/201/100/100",
    role: "Teacher",
  };

  return <AppShell navLinks={teacherNavLinks} user={user}>{children}</AppShell>;
}
