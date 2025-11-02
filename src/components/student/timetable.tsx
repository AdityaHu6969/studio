
"use client";

import React from 'react';
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export type PeriodStatus = "Present" | "Absent" | "Leave" | "Upcoming" | "Special";

export interface Period {
  subject: string;
  status: PeriodStatus;
  teacher: string;
  room: string;
}

export interface Teacher {
  name: string;
  avatar: string;
  email: string;
  phone: string;
}

export interface Course {
  description: string;
}

// More detailed schedule data including status, teacher, and room
export const scheduleData: Record<string, Record<string, Period>> = {
    "9:00-10:00": {
        "Monday": { subject: "Calculus II", status: "Present", teacher: "Dr. Evans", room: "A-101" },
        "Tuesday": { subject: "Physics I", status: "Present", teacher: "Dr. Smith", room: "B-203" },
        "Wednesday": { subject: "Calculus II", status: "Absent", teacher: "Dr. Evans", room: "A-101" },
        "Thursday": { subject: "Physics I", status: "Present", teacher: "Dr. Smith", room: "B-203" },
        "Friday": { subject: "Calculus II", status: "Present", teacher: "Dr. Evans", room: "A-101" },
    },
    "10:00-11:00": {
        "Monday": { subject: "Chemistry I", status: "Present", teacher: "Dr. Reed", room: "C-105" },
        "Tuesday": { subject: "World History", status: "Leave", teacher: "Dr. Jones", room: "D-110" },
        "Wednesday": { subject: "Chemistry I", status: "Present", teacher: "Dr. Reed", room: "C-105" },
        "Thursday": { subject: "World History", status: "Present", teacher: "Dr. Jones", room: "D-110" },
        "Friday": { subject: "Lab", status: "Special", teacher: "Dr. Reed", room: "Lab-1" },
    },
    "11:00-12:00": {
        "Monday": { subject: "English Lit", status: "Present", teacher: "Dr. Austen", room: "E-201" },
        "Tuesday": { subject: "Calculus II", status: "Present", teacher: "Dr. Evans", room: "A-101" },
        "Wednesday": { subject: "English Lit", status: "Present", teacher: "Dr. Austen", room: "E-201" },
        "Thursday": { subject: "Calculus II", status: "Present", teacher: "Dr. Evans", room: "A-101" },
        "Friday": { subject: "Lab", status: "Special", teacher: "Dr. Reed", room: "Lab-1" },
    },
    "12:00-1:00": {
        "Monday": { subject: "Lunch", status: "Special", teacher: "-", room: "Cafeteria" },
        "Tuesday": { subject: "Lunch", status: "Special", teacher: "-", room: "Cafeteria" },
        "Wednesday": { subject: "Lunch", status: "Special", teacher: "-", room: "Cafeteria" },
        "Thursday": { subject: "Lunch", status: "Special", teacher: "-", room: "Cafeteria" },
        "Friday": { subject: "Lunch", status: "Special", teacher: "-", room: "Cafeteria" },
    },
    "1:00-2:00": {
        "Monday": { subject: "World History", status: "Present", teacher: "Dr. Jones", room: "D-110" },
        "Tuesday": { subject: "English Lit", status: "Present", teacher: "Dr. Austen", room: "E-201" },
        "Wednesday": { subject: "Physics I", status: "Present", teacher: "Dr. Smith", room: "B-203" },
        "Thursday": { subject: "Chemistry I", status: "Upcoming", teacher: "Dr. Reed", room: "C-105" },
        "Friday": { subject: "English Lit", status: "Upcoming", teacher: "Dr. Austen", room: "E-201" },
    },
    "2:00-3:00": {
        "Monday": { subject: "Art History", status: "Present", teacher: "Dr. Vinci", room: "F-101" },
        "Tuesday": { subject: "Chemistry I", status: "Present", teacher: "Dr. Reed", room: "C-105" },
        "Wednesday": { subject: "World History", status: "Upcoming", teacher: "Dr. Jones", room: "D-110" },
        "Thursday": { subject: "English Lit", status: "Upcoming", teacher: "Dr. Austen", room: "E-201" },
        "Friday": { subject: "Sports", status: "Special", teacher: "Coach K", room: "Field" },
    },
    "3:00-4:00": {
        "Monday": { subject: "Free Period", status: "Special", teacher: "-", room: "-" },
        "Tuesday": { subject: "Free Period", status: "Special", teacher: "-", room: "-" },
        "Wednesday": { subject: "Free Period", status: "Special", teacher: "-", room: "-" },
        "Thursday": { subject: "Free Period", status: "Special", teacher: "-", room: "-" },
        "Friday": { subject: "Sports", status: "Special", teacher: "Coach K", room: "Field" },
    },
};


export const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
export const timeSlots = Object.keys(scheduleData);

export const getStatusColor = (status: PeriodStatus, subject: string) => {
  if (subject === "Lunch" || subject === "Free Period") {
    return "text-muted-foreground";
  }
  switch (status) {
    case "Present":
      return "border-l-4 border-green-500";
    case "Absent":
      return "border-l-4 border-red-500";
    case "Leave":
      return "border-l-4 border-yellow-500";
    case "Upcoming":
      return "border-l-4 border-gray-400";
    case "Special":
      return "border-l-4 border-purple-500";
    default:
      return "bg-card";
  }
};
