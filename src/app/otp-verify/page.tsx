"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function OtpVerificationPage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-4">
       <Link href="/login" className="absolute top-4 left-4 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" />
        Back to Login
      </Link>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Enter Verification Code</CardTitle>
          <CardDescription>
            We&apos;ve sent a 6-digit code to your email/mobile. Please enter it below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4">
            <Input id="otp" type="text" placeholder="- - - - - -" required />
            <Button type="submit" className="w-full">
              Verify
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="text-muted-foreground">
            Didn&apos;t receive the code?{" "}
            <Button variant="link" className="px-0 h-auto">
              Resend code
            </Button>
          </div>
        </CardFooter>
      </Card>
    </main>
  );
}
