"use client";

import { Suspense } from 'react';
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || "student"; // Default to student

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd perform authentication here.
    // For this demo, we'll set a flag in localStorage to persist session.
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userRole', role);

    const dashboardUrl = role === 'teacher' ? `/${role}/attendance` : `/${role}/dashboard`;
    router.push(dashboardUrl);
  };
  
  const roleName = role.charAt(0).toUpperCase() + role.slice(1);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Link href="/" className="absolute top-4 left-4 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" />
        Back to role selection
      </Link>
      <Card className="w-full max-w-sm shadow-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-headline">{roleName} Login</CardTitle>
          <CardDescription>
            Enter your credentials to access your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                defaultValue={role === 'admin' ? 'admin@patel.edu' : role === 'teacher' ? 'teacher@patel.edu' : 'student@patel.edu'}
                autoComplete="email"
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link href="/otp-verify" className="ml-auto inline-block text-sm underline">
                  Forgot password?
                </Link>
              </div>
              <Input id="password" type="password" required autoComplete="current-password" />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/set-password" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}
