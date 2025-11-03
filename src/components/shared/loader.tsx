"use client";

import { cn } from "@/lib/utils";

export function Loader({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent animate-pulse-grow" />
    </div>
  );
}
