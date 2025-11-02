"use client";

import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

// Mock data: 0 for absent, 1 for present, 2 for leave/partial
const attendanceData: Record<string, number> = {
  "2024-07-01": 1,
  "2024-07-02": 1,
  "2024-07-03": 0,
  "2024-07-04": 1,
  "2024-07-05": 2,
  "2024-07-08": 1,
  "2024-07-09": 1,
};

const getDayStatusClass = (date: Date) => {
  const dateString = date.toISOString().split("T")[0];
  const status = attendanceData[dateString];

  switch (status) {
    case 1: // All present
      return "bg-green-100/80 dark:bg-green-900/60 text-green-800 dark:text-green-300 font-semibold";
    case 0: // Any absent
      return "bg-red-100/80 dark:bg-red-900/60 text-red-800 dark:text-red-300 font-semibold";
    case 2: // Leave or partial
      return "bg-yellow-100/80 dark:bg-yellow-800/50 text-yellow-800 dark:text-yellow-300 font-semibold";
    default:
      return "";
  }
};

export function TimetableMonthlyView() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <div className="flex justify-center animate-fade-in-up">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
        modifiers={{
          status: (date) => attendanceData.hasOwnProperty(date.toISOString().split("T")[0]),
        }}
        modifiersClassNames={{
          status: "day-status",
        }}
        styles={{
          day: {
            borderRadius: '0.375rem',
            transition: 'all 0.2s ease-in-out',
          }
        }}
        components={{
          DayContent: ({ date, displayMonth, ...props }) => (
            <div
              {...props}
              className={cn(
                "relative flex h-full w-full items-center justify-center",
                getDayStatusClass(date)
              )}
            >
              {props.children}
            </div>
          ),
        }}
      />
    </div>
  );
}
