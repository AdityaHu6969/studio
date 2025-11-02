"use client";

import { cn } from "@/lib/utils";

const schedule = {
  "9:00 - 10:00": { "Monday": "Math", "Tuesday": "Physics", "Wednesday": "Math", "Thursday": "Physics", "Friday": "Math" },
  "10:00 - 11:00": { "Monday": "Chemistry", "Tuesday": "History", "Wednesday": "Chemistry", "Thursday": "History", "Friday": "Lab" },
  "11:00 - 12:00": { "Monday": "English", "Tuesday": "Math", "Wednesday": "English", "Thursday": "Math", "Friday": "Lab" },
  "12:00 - 1:00": { "Monday": "Lunch", "Tuesday": "Lunch", "Wednesday": "Lunch", "Thursday": "Lunch", "Friday": "Lunch" },
  "1:00 - 2:00": { "Monday": "History", "Tuesday": "English", "Wednesday": "Physics", "Thursday": "Chemistry", "Friday": "English" },
  "2:00 - 3:00": { "Monday": "Physics", "Tuesday": "Chemistry", "Wednesday": "History", "Thursday": "English", "Friday": "Sports" },
  "3:00 - 4:00": { "Monday": "Free", "Tuesday": "Free", "Wednesday": "Free", "Thursday": "Free", "Friday": "Sports" },
};

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const timeSlots = Object.keys(schedule);

const getSubjectColor = (subject: string) => {
  switch (subject) {
    case "Math": return "bg-blue-100 dark:bg-blue-900/50";
    case "Physics": return "bg-green-100 dark:bg-green-900/50";
    case "Chemistry": return "bg-yellow-100 dark:bg-yellow-900/50";
    case "History": return "bg-indigo-100 dark:bg-indigo-900/50";
    case "English": return "bg-pink-100 dark:bg-pink-900/50";
    case "Lab": return "bg-purple-100 dark:bg-purple-900/50";
    case "Sports": return "bg-orange-100 dark:bg-orange-900/50";
    case "Lunch": return "bg-gray-200 dark:bg-gray-700";
    default: return "bg-gray-100 dark:bg-gray-800";
  }
};


export function Timetable() {
  return (
    <div className="w-full overflow-x-auto">
      <div className="grid grid-cols-[auto_repeat(5,1fr)] min-w-[700px]">
        {/* Header Row */}
        <div className="font-semibold p-2 border-b border-r">Time</div>
        {days.map((day) => (
          <div key={day} className="font-semibold p-2 text-center border-b">
            {day}
          </div>
        ))}

        {/* Schedule Rows */}
        {timeSlots.map((time) => (
          <React.Fragment key={time}>
            <div className="font-medium p-2 border-r text-xs sm:text-sm">{time}</div>
            {days.map((day) => {
              // @ts-ignore
              const subject = schedule[time][day] || "Free";
              return (
                <div
                  key={`${time}-${day}`}
                  className={cn(
                    "flex items-center justify-center p-2 border-t text-center text-xs sm:text-sm rounded-md m-1",
                    getSubjectColor(subject)
                  )}
                >
                  {subject}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

// Add React to the scope
import React from 'react';
