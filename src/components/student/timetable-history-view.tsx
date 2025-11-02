
'use client';

import React, { useMemo } from 'react';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Period, PeriodStatus } from './timetable';
import { format, isSameDay, getDay, isFuture } from 'date-fns';

interface HistoryEntry extends Period {
  date: Date;
}

const historyData: HistoryEntry[] = [
  // Today's Data
  { date: new Date(new Date().setHours(9, 30, 0, 0)), subject: "Calculus II", status: "Present", teacher: "Dr. Evans", room: "A-101" },
  { date: new Date(new Date().setHours(11, 0, 0, 0)), subject: "Chemistry I", status: "Absent", teacher: "Dr. Reed", room: "C-105" },
  
  // Yesterday
  { date: new Date(new Date().setDate(new Date().getDate() - 1)), subject: "Physics I", status: "Present", teacher: "Dr. Smith", room: "B-203" },
  
  // 2 days ago
  { date: new Date(new Date().setDate(new Date().getDate() - 2)), subject: "English Lit", status: "Present", teacher: "Dr. Austen", room: "E-201" },
  { date: new Date(new Date().setDate(new Date().getDate() - 2)), subject: "Calculus II", status: "Absent", teacher: "Dr. Evans", room: "A-101" },

  // 3 days ago
  { date: new Date(new Date().setDate(new Date().getDate() - 3)), subject: "World History", status: "Leave", teacher: "Dr. Jones", room: "D-110" },
  
  // 4 days ago
  { date: new Date(new Date().setDate(new Date().getDate() - 4)), subject: "Calculus II", status: "Present", teacher: "Dr. Evans", room: "A-101" },
  { date: new Date(new Date().setDate(new Date().getDate() - 4)), subject: "Chemistry I", status: "Present", teacher: "Dr. Reed", room: "C-105" },
  { date: new Date(new Date().setDate(new Date().getDate() - 4)), subject: "English Lit", status: "Present", teacher: "Dr. Austen", room: "E-201" },

  // 5 days ago
  { date: new Date(new Date().setDate(new Date().getDate() - 5)), subject: "Physics I", status: "Present", teacher: "Dr. Smith", room: "B-203" },
];

const getBadgeVariant = (status: PeriodStatus) => {
    switch (status) {
        case "Present": return "default";
        case "Absent": return "destructive";
        case "Leave": return "secondary";
        default: return "outline";
    }
}

const getBadgeClass = (status: PeriodStatus) => {
    switch (status) {
        case "Present": return "bg-green-500/20 text-green-700 border-green-500/30 hover:bg-green-500/30 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20";
        case "Leave": return "bg-yellow-500/20 text-yellow-700 border-yellow-500/30 hover:bg-yellow-500/30 dark:bg-yellow-500/10 dark:text-yellow-400 dark:border-yellow-500/20";
        default: return "";
    }
}

interface TimetableHistoryViewProps {
  selectedDate?: Date;
}

export function TimetableHistoryView({ selectedDate }: TimetableHistoryViewProps) {
  const isWeekend = useMemo(() => {
    if (!selectedDate) return false;
    const day = getDay(selectedDate);
    return day === 0 || day === 6; // Sunday is 0, Saturday is 6
  }, [selectedDate]);

  const isFutureDate = useMemo(() => {
    if (!selectedDate) return false;
    return isFuture(selectedDate) && !isSameDay(selectedDate, new Date());
  }, [selectedDate]);

  const filteredHistory = useMemo(() => {
    if (!selectedDate || isWeekend || isFutureDate) {
      return [];
    }
    return historyData.filter(item => isSameDay(item.date, selectedDate)).sort((a,b) => a.date.getTime() - b.date.getTime());
  }, [selectedDate, isWeekend, isFutureDate]);

  return (
    <ScrollArea className="h-96 w-full rounded-md border animate-fade-in-up">
      <div className="p-4">
        {isFutureDate ? (
            <div className="flex h-full min-h-[200px] flex-col items-center justify-center text-center text-muted-foreground">
                <p className="font-semibold text-lg">Upcoming Day</p>
                <p>Classes for {selectedDate ? format(selectedDate, 'eeee, MMMM do') : 'a future date'} are not yet recorded.</p>
            </div>
        ) : isWeekend ? (
           <div className="flex h-full min-h-[200px] flex-col items-center justify-center text-center text-muted-foreground">
             <p className="font-semibold text-lg">It's a Holiday!</p>
             <p>No classes are scheduled on Saturday or Sunday.</p>
           </div>
        ) : filteredHistory.length > 0 ? (
          filteredHistory.map((item, index) => (
            <React.Fragment key={index}>
              <div className="flex items-start justify-between gap-4 py-3">
                <div className="flex-grow">
                  <p className="font-semibold">{item.subject}</p>
                  <p className="text-sm text-muted-foreground">
                    {format(item.date, "h:mm a")}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Teacher: {item.teacher} | Room: {item.room}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <Badge variant={getBadgeVariant(item.status)} className={getBadgeClass(item.status)}>
                    {item.status}
                  </Badge>
                </div>
              </div>
              {index < filteredHistory.length - 1 && <Separator />}
            </React.Fragment>
          ))
        ) : (
          <div className="flex h-full min-h-[200px] items-center justify-center text-muted-foreground">
            <p>No attendance records found for this date.</p>
          </div>
        )}
      </div>
    </ScrollArea>
  );
}
