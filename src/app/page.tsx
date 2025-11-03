"use client";

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { User, UserCog, Shield } from "lucide-react";

const roles = [
  {
    name: "Student",
    description: "Access your dashboard, attendance, and more.",
    icon: <User className="h-12 w-12 text-primary" />,
    href: "/login?role=student",
    role: "student",
  },
  {
    name: "Teacher",
    description: "Mark attendance, manage classes, and communicate.",
    icon: <UserCog className="h-12 w-12 text-primary" />,
    href: "/login?role=teacher",
    role: "teacher",
  },
  {
    name: "Admin",
    description: "Manage users, settings, and oversee the system.",
    icon: <Shield className="h-12 w-12 text-primary" />,
    href: "/login?role=admin",
    role: "admin",
  },
];

export default function RoleSelectionPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl font-headline">
          Patel College Hub
        </h1>
        <p className="mt-3 max-w-2xl mx-auto text-base text-muted-foreground sm:text-lg md:text-xl">
          Your one-stop portal for college life. Please select your role to continue.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3 max-w-4xl w-full">
        {roles.map((role) => (
          <Link href={role.href} key={role.name} className="group">
            <Card className="h-full transform transition-all duration-200 ease-in-out group-hover:scale-105 group-hover:shadow-xl group-hover:border-primary">
              <CardHeader className="items-center text-center p-4 sm:p-6">
                {role.icon}
                <CardTitle className="mt-4 text-xl sm:text-2xl font-semibold">{role.name}</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <CardDescription className="text-center">{role.description}</CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
       <footer className="mt-12 sm:mt-16 text-center text-muted-foreground text-sm">
        <p>&copy; {new Date().getFullYear()} Patel College. All rights reserved.</p>
      </footer>
    </main>
  );
}
