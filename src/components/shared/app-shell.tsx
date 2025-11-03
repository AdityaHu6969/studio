
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppShellContent } from "./app-shell-content";

interface AppShellProps {
  children: React.ReactNode;
  nav: React.ReactNode;
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
