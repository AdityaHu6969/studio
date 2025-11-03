import { LayoutDashboard, CalendarCheck, Users, ShieldCheck, Settings, CalendarClock, Calendar } from "lucide-react";

// The NavLink now stores the name of the icon as a string.
export interface NavLink {
  href: string;
  label: string;
  iconName: keyof typeof import("lucide-react");
}

export const navIcons = {
  LayoutDashboard,
  CalendarCheck,
  Users,
  ShieldCheck,
  Settings,
  CalendarClock,
  Calendar,
};

export const studentNavLinks: NavLink[] = [
  {
    href: "/student/dashboard",
    label: "Dashboard",
    iconName: "LayoutDashboard",
  },
  {
    href: "/student/timetable",
    label: "Attendance History",
    iconName: "CalendarClock",
  },
  {
    href: "/student/courses",
    label: "Timetable",
    iconName: "Calendar",
  }
];

export const teacherNavLinks: NavLink[] = [
  {
    href: "/teacher/attendance",
    label: "Attendance",
    iconName: "CalendarCheck",
  },
];

export const adminNavLinks: NavLink[] = [
  {
    href: "/admin/dashboard",
    label: "User Management",
    iconName: "Users",
  },
  {
    href: "#",
    label: "Settings",
    iconName: "Settings",
  },
];

export const godAdminNavLinks: NavLink[] = [
  ...adminNavLinks,
  {
    href: "#",
    label: "System Control",
    iconName: "ShieldCheck",
  },
];
