import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { User, UserCog, Shield } from "lucide-react";

const roles = [
  {
    name: "Student",
    description: "Access your dashboard, attendance, and more.",
    icon: <User className="h-12 w-12 text-primary" />,
    href: "/login?role=student",
  },
  {
    name: "Teacher",
    description: "Mark attendance, manage classes, and communicate.",
    icon: <UserCog className="h-12 w-12 text-primary" />,
    href: "/login?role=teacher",
  },
  {
    name: "Admin",
    description: "Manage users, settings, and oversee the system.",
    icon: <Shield className="h-12 w-12 text-primary" />,
    href: "/login?role=admin",
  },
];

export default function RoleSelectionPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl font-headline">
          Patel College Hub
        </h1>
        <p className="mt-3 text-lg text-muted-foreground sm:mt-5 sm:text-xl">
          Your one-stop portal for college life. Please select your role to continue.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3 max-w-4xl w-full">
        {roles.map((role) => (
          <Link href={role.href} key={role.name} className="group">
            <Card className="h-full transform transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-xl group-hover:border-primary">
              <CardHeader className="items-center text-center">
                {role.icon}
                <CardTitle className="mt-4 text-2xl font-semibold">{role.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">{role.description}</CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
       <footer className="mt-16 text-center text-muted-foreground text-sm">
        <p>&copy; {new Date().getFullYear()} Patel College. All rights reserved.</p>
      </footer>
    </main>
  );
}
