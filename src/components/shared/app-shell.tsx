import { SidebarProvider } from "@/components/ui/sidebar";
import { AppShellContent } from "./app-shell-content";
import type { NavLink } from "@/lib/nav-links";

interface AppShellProps {
  children: React.ReactNode;
  navLinks: NavLink[];
  user: { name: string; email: string; avatar: string; role: string };
  onLogout?: () => void;
}

export function AppShell(props: AppShellProps) {
  return (
    <SidebarProvider>
      <AppShellContent {...props} />
    </SidebarProvider>
  );
}
