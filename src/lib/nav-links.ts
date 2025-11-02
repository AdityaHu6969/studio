import type { LucideIcon } from "lucide-react";
import { LayoutDashboard, CalendarCheck, Users, ShieldCheck, Settings, CalendarClock, BookUser } from "lucide-react";

export interface NavLink {
  href: string;
  label: string;
  icon: LucideIcon;
}

export const studentNavLinks: NavLink[] = [
  {
    href: "/student/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/student/timetable",
    label: "Attendance History",
    icon: CalendarClock,
  },
  {
    href: "/student/courses",
    label: "Courses & Faculty",
    icon: BookUser,
  }
];

export const teacherNavLinks: NavLink[] = [
  {
    href: "/teacher/attendance",
    label: "Attendance",
    icon: CalendarCheck,
  },
];

export const adminNavLinks: NavLink[] = [
  {
    href: "/admin/dashboard",
    label: "User Management",
    icon: Users,
  },
  {
    href: "#",
    label: "Settings",
    icon: Settings,
  },
];

export const godAdminNavLinks: NavLink[] = [
  ...adminNavLinks,
  {
    href: "#",
    label: "System Control",
    icon: ShieldCheck,
  },
];
