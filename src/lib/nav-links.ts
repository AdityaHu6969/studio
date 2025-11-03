
'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import { LayoutDashboard, CalendarCheck, Users, ShieldCheck, Settings, CalendarClock, BookUser, Calendar } from "lucide-react";
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { useSidebar } from "@/components/ui/sidebar";

export interface NavLink {
  href: string;
  label: string;
  icon: LucideIcon;
}

const studentNavLinks: NavLink[] = [
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
    label: "Timetable",
    icon: Calendar,
  }
];

const teacherNavLinks: NavLink[] = [
  {
    href: "/teacher/attendance",
    label: "Attendance",
    icon: CalendarCheck,
  },
];

const adminNavLinks: NavLink[] = [
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

const godAdminNavLinks: NavLink[] = [
  ...adminNavLinks,
  {
    href: "#",
    label: "System Control",
    icon: ShieldCheck,
  },
];

function NavLinks({ links }: { links: NavLink[] }) {
  const pathname = usePathname();
  const { isMobile, setOpenMobile } = useSidebar();

  const handleLinkClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <SidebarMenu>
      {links.map((link) => (
        <SidebarMenuItem key={link.href}>
          <Link href={link.href} className="w-full" onClick={handleLinkClick}>
            <SidebarMenuButton
              isActive={pathname === link.href}
              tooltip={link.label}
            >
              <link.icon />
              <span>{link.label}</span>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}

export function StudentNav() {
    return <NavLinks links={studentNavLinks} />;
}

export function TeacherNav() {
    return <NavLinks links={teacherNavLinks} />;
}

export function AdminNav() {
    return <NavLinks links={adminNavLinks} />;
}

export function GodAdminNav() {
    return <NavLinks links={godAdminNavLinks} />;
}
