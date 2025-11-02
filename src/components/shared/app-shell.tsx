"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
  useSidebar,
} from "@/components/ui/sidebar";
import { GraduationCap, LogOut, PanelLeft } from "lucide-react";
import type { NavLink } from "@/lib/nav-links";
import { cn } from "@/lib/utils";

interface AppShellProps {
  children: React.ReactNode;
  navLinks: NavLink[];
  user: { name: string; email: string; avatar: string; role: string };
  onLogout?: () => void;
}

function AppHeader() {
  const { isMobile } = useSidebar();

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-card px-4 sm:px-6 sticky top-0 z-30">
      <SidebarTrigger className={cn(isMobile && "hidden")}>
        <PanelLeft />
      </SidebarTrigger>
      <SidebarTrigger className={cn("sm:hidden")}>
        <PanelLeft />
      </SidebarTrigger>
      <div className="flex-1">
        <h1 className="text-lg font-semibold">{useSidebar().user.role} Portal</h1>
      </div>
    </header>
  );
}


export function AppShell({ children, navLinks, user, onLogout }: AppShellProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userRole');
      router.push('/');
    }
  };

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-primary" />
            <span className="font-semibold text-lg truncate">Patel College Hub</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navLinks.map((link) => (
              <SidebarMenuItem key={link.href}>
                <Link href={link.href} className="w-full">
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
        </SidebarContent>
        <SidebarFooter>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-start gap-2 h-12 px-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="text-left truncate">
                  <p className="font-medium truncate">{user.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 mb-2" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarFooter>
      </Sidebar>
      <div className="flex flex-col h-screen w-full transition-all duration-300 ease-in-out group-data-[state=expanded]:sm:pl-64">
        <header className="flex h-14 items-center gap-4 border-b bg-card px-4 sm:px-6 sticky top-0 z-30 flex-shrink-0">
            <SidebarTrigger>
              <PanelLeft />
            </SidebarTrigger>
            <div className="flex-1">
              <h1 className="text-lg font-semibold">{user.role} Portal</h1>
            </div>
        </header>
        <main className="flex-1 overflow-auto bg-muted/40">{children}</main>
      </div>
    </SidebarProvider>
  );
}
