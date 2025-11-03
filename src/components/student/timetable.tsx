
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
  teacher: string;
  room?: string;
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
        "Monday": { subject: "Calculus II", teacher: "Dr. Evans", room: "A-101" },
        "Tuesday": { subject: "Physics I", teacher: "Dr. Smith", room: "B-203" },
        "Wednesday": { subject: "Calculus II", teacher: "Dr. Evans", room: "A-101" },
        "Thursday": { subject: "Physics I", teacher: "Dr. Smith", room: "B-203" },
        "Friday": { subject: "Calculus II", teacher: "Dr. Evans", room: "A-101" },
    },
    "10:00-11:00": {
        "Monday": { subject: "Chemistry I", teacher: "Dr. Reed", room: "C-105" },
        "Tuesday": { subject: "World History", teacher: "Dr. Jones", room: "D-110" },
        "Wednesday": { subject: "Chemistry I", teacher: "Dr. Reed", room: "C-105" },
        "Thursday": { subject: "World History", teacher: "Dr. Jones", room: "D-110" },
        "Friday": { subject: "Lab", teacher: "Dr. Reed", room: "Lab-1" },
    },
    "11:00-12:00": {
        "Monday": { subject: "English Lit", teacher: "Dr. Austen", room: "E-201" },
        "Tuesday": { subject: "Calculus II", teacher: "Dr. Evans", room: "A-101" },
        "Wednesday": { subject: "English Lit", teacher: "Dr. Austen", room: "E-201" },
        "Thursday": { subject: "Calculus II", teacher: "Dr. Evans", room: "A-101" },
        "Friday": { subject: "Lab", teacher: "Dr. Reed", room: "Lab-1" },
    },
    "12:00-1:00": {
        "Monday": { subject: "Lunch", teacher: "-", room: "Cafeteria" },
        "Tuesday": { subject: "Lunch", teacher: "-", room: "Cafeteria" },
        "Wednesday": { subject: "Lunch", teacher: "-", room: "Cafeteria" },
        "Thursday": { subject: "Lunch", teacher: "-", room: "Cafeteria" },
        "Friday": { subject: "Lunch", teacher: "-", room: "Cafeteria" },
    },
    "1:00-2:00": {
        "Monday": { subject: "World History", teacher: "Dr. Jones", room: "D-110" },
        "Tuesday": { subject: "English Lit", teacher: "Dr. Austen", room: "E-201" },
        "Wednesday": { subject: "Physics I", teacher: "Dr. Smith", room: "B-203" },
        "Thursday": { subject: "Chemistry I", teacher: "Dr. Reed", room: "C-105" },
        "Friday": { subject: "English Lit", teacher: "Dr. Austen", room: "E-201" },
    },
    "2:00-3:00": {
        "Monday": { subject: "Art History", teacher: "Dr. Vinci", room: "F-101" },
        "Tuesday": { subject: "Chemistry I", teacher: "Dr. Reed", room: "C-105" },
        "Wednesday": { subject: "World History", teacher: "Dr. Jones", room: "D-110" },
        "Thursday": { subject: "English Lit", teacher: "Dr. Austen", room: "E-201" },
        "Friday": { subject: "Sports", teacher: "Coach K", room: "Field" },
    },
    "3:00-4:00": {
        "Monday": { subject: "Free Period", teacher: "-", room: "-" },
        "Tuesday": { subject: "Free Period", teacher: "-", room: "-" },
        "Wednesday": { subject: "Free Period", teacher: "-", room: "-" },
        "Thursday": { subject: "Free Period", teacher: "-", room: "-" },
        "Friday": { subject: "Sports", teacher: "Coach K", room: "Field" },
    },
};


export const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
export const timeSlots = Object.keys(scheduleData);

const subjectColors: Record<string, string> = {
  "Calculus II": "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300",
  "Physics I": "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300",
  "Chemistry I": "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300",
  "World History": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300",
  "English Lit": "bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300",
  "Art History": "bg-pink-100 text-pink-800 dark:bg-pink-900/50 dark:text-pink-300",
  "Lab": "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300",
  "Sports": "bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300",
};


export const getSubjectColor = (subject: string) => {
  if (subject === "Lunch" || subject === "Free Period") {
    return "bg-card/50";
  }
  return subjectColors[subject] || "bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-300";
};

export const teachers: Record<string, Teacher> = {
  "Dr. Evans": { name: "Dr. Alan Evans", avatar: "https://picsum.photos/seed/202/100/100", email: "a.evans@patel.edu", phone: "123-456-7890" },
  "Dr. Smith": { name: "Dr. Ben Smith", avatar: "https://picsum.photos/seed/203/100/100", email: "b.smith@patel.edu", phone: "123-456-7891" },
  "Dr. Jones": { name: "Dr. Chloe Jones", avatar: "https://picsum.photos/seed/204/100/100", email: "c.jones@patel.edu", phone: "123-456-7892" },
  "Dr. Reed": { name: "Dr. Evelyn Reed", avatar: "https://picsum.photos/seed/201/100/100", email: "e.reed@patel.edu", phone: "123-456-7893" },
  "Dr. Austen": { name: "Dr. Diana Austen", avatar: "https://picsum.photos/seed/205/100/100", email: "d.austen@patel.edu", phone: "123-456-7894" },
  "Dr. Vinci": { name: "Dr. Frank Vinci", avatar: "https://picsum.photos/seed/206/100/100", email: "f.vinci@patel.edu", phone: "123-456-7895" },
  "Coach K": { name: "Coach K", avatar: "https://picsum.photos/seed/207/100/100", email: "coach.k@patel.edu", phone: "123-456-7896" },
};

export const courseDetails: Record<string, Course> = {
  "Calculus II": { description: "Advanced topics in differential and integral calculus, including sequences, series, and polar coordinates." },
  "Physics I": { description: "An introduction to classical mechanics, including kinematics, Newton's laws, energy, momentum, and rotational motion." },
  "Chemistry I": { description: "Fundamentals of chemistry, including atomic structure, chemical bonding, stoichiometry, and the properties of gases." },
  "World History": { description: "A survey of major global events, societies, and cultural developments from ancient civilizations to the modern era." },
  "English Lit": { description: "Analysis of major works of English literature, exploring various genres and literary movements from Chaucer to the present day." },
  "Art History": { description: "A journey through the history of art, from Renaissance masterpieces to the revolutionary ideas of Pop Art." },
  "Lab": { description: "Practical laboratory session to accompany a science course, providing hands-on experience with experimental techniques." },
  "Sports": { description: "Physical education and sports activities." },
  "Lunch": { description: "Scheduled break for lunch." },
  "Free Period": { description: "An unscheduled period for study or relaxation." },
};
