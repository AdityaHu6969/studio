"use client";

import React from 'react';
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { scheduleData, days, timeSlots, getStatusColor, Period } from './timetable';

export function TimetableWeeklyView() {
  return (
    <TooltipProvider>
      <div className="w-full overflow-x-auto">
        <div className="grid grid-cols-[auto_repeat(5,minmax(120px,1fr))] min-w-[650px] animate-fade-in-up">
          {/* Header Row */}
          <div className="font-semibold p-3 border-b border-r sticky left-0 bg-card z-10 text-xs sm:text-sm text-muted-foreground">Time</div>
          {days.map((day) => (
            <div key={day} className="font-semibold p-3 text-center border-b text-xs sm:text-sm text-muted-foreground">
              {day}
            </div>
          ))}

          {/* Schedule Rows */}
          {timeSlots.map((time, timeIndex) => (
            <React.Fragment key={time}>
              <div className="font-semibold p-2 border-r text-xs sm:text-sm sticky left-0 bg-card z-10 flex items-center justify-center text-muted-foreground">{time}</div>
              {days.map((day, dayIndex) => {
                const period = scheduleData[time]?.[day];
                if (!period) {
                    return <div key={`${time}-${day}`} className="border-t m-1" />;
                }
                
                return (
                    <Tooltip key={`${time}-${day}`} delayDuration={150}>
                        <TooltipTrigger asChild>
                            <div
                                className={cn(
                                    "relative flex flex-col items-center justify-center p-2 border-t text-center rounded-lg m-1 min-h-[70px] transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg",
                                    getStatusColor(period.status, period.subject)
                                )}
                                style={{ animation: `fade-in-up 0.5s ${timeIndex * 0.05 + dayIndex * 0.02}s ease-out forwards`, opacity: 0 }}
                            >
                                <p className="font-bold text-sm sm:text-base">{period.subject}</p>
                                <p className="text-xs sm:text-sm opacity-80">{period.teacher}</p>
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p className='font-semibold'>{period.subject} ({period.status})</p>
                            <p className="text-muted-foreground">Teacher: {period.teacher}</p>
                            <p className="text-muted-foreground">Room: {period.room}</p>
                        </TooltipContent>
                    </Tooltip>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    </TooltipProvider>
  );
}
