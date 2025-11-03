
'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { useSidebar } from "@/components/ui/sidebar";
import type { NavLink } from "./nav-links-data";
import { navIcons } from "./nav-links-data";

export function NavLinks({ links }: { links: NavLink[] }) {
  const pathname = usePathname();
  const { isMobile, setOpenMobile } = useSidebar();

  const handleLinkClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <SidebarMenu>
      {links.map((link) => {
        const Icon = navIcons[link.iconName];
        return (
          <SidebarMenuItem key={link.href}>
            <Link href={link.href} className="w-full" onClick={handleLinkClick}>
              <SidebarMenuButton
                isActive={pathname === link.href}
                tooltip={link.label}
              >
                <Icon />
                <span>{link.label}</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}
