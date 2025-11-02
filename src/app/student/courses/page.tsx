
'use client';

import * as React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, Phone } from "lucide-react";
import { scheduleData, days, timeSlots, getStatusColor, Period, Teacher, Course } from '@/components/student/timetable';
import { cn } from '@/lib/utils';

const teachers: Record<string, Teacher> = {
  "Dr. Evans": { name: "Dr. Alan Evans", avatar: "https://picsum.photos/seed/202/100/100", email: "a.evans@patel.edu", phone: "123-456-7890" },
  "Dr. Smith": { name: "Dr. Ben Smith", avatar: "https://picsum.photos/seed/203/100/100", email: "b.smith@patel.edu", phone: "123-456-7891" },
  "Dr. Jones": { name: "Dr. Chloe Jones", avatar: "https://picsum.photos/seed/204/100/100", email: "c.jones@patel.edu", phone: "123-456-7892" },
  "Dr. Reed": { name: "Dr. Evelyn Reed", avatar: "https://picsum.photos/seed/201/100/100", email: "e.reed@patel.edu", phone: "123-456-7893" },
  "Dr. Austen": { name: "Dr. Diana Austen", avatar: "https://picsum.photos/seed/205/100/100", email: "d.austen@patel.edu", phone: "123-456-7894" },
  "Dr. Vinci": { name: "Dr. Frank Vinci", avatar: "https://picsum.photos/seed/206/100/100", email: "f.vinci@patel.edu", phone: "123-456-7895" },
  "Coach K": { name: "Coach K", avatar: "https://picsum.photos/seed/207/100/100", email: "coach.k@patel.edu", phone: "123-456-7896" },
};

const courseDetails: Record<string, Course> = {
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


export default function TimetablePage() {
  const [selectedPeriod, setSelectedPeriod] = React.useState<{ period: Period, day: string, time: string } | null>(null);

  const handlePeriodClick = (period: Period, day: string, time: string) => {
    if (period.subject !== "Lunch" && period.subject !== "Free Period") {
      setSelectedPeriod({ period, day, time });
    }
  };

  const teacher = selectedPeriod ? teachers[selectedPeriod.period.teacher] : null;
  const course = selectedPeriod ? courseDetails[selectedPeriod.period.subject] : null;

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Weekly Timetable</h1>
        <p className="text-muted-foreground">Your weekly class schedule. Click a class for more details.</p>
      </div>
      <div className="w-full overflow-x-auto rounded-lg border">
        <div className="grid grid-cols-[auto_repeat(5,minmax(140px,1fr))] min-w-[700px] animate-fade-in-up">
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

                const isClickable = period.subject !== "Lunch" && period.subject !== "Free Period";

                return (
                  <div
                    key={`${time}-${day}`}
                    onClick={() => handlePeriodClick(period, day, time)}
                    className={cn(
                      "relative flex flex-col items-center justify-center p-2 border-t text-center rounded-lg m-1 min-h-[70px] transition-all duration-300 ease-in-out transform",
                      isClickable && "cursor-pointer hover:scale-105 hover:shadow-xl",
                      getStatusColor(period.status, period.subject)
                    )}
                    style={{ animation: `fade-in-up 0.5s ${timeIndex * 0.05 + dayIndex * 0.02}s ease-out forwards`, opacity: 0 }}
                  >
                    <p className="font-bold text-sm sm:text-base">{period.subject}</p>
                    <p className="text-xs sm:text-sm opacity-80">{period.teacher}</p>
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>

      <Dialog open={!!selectedPeriod} onOpenChange={(isOpen) => !isOpen && setSelectedPeriod(null)}>
        <DialogContent className="sm:max-w-md">
          {selectedPeriod && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedPeriod.period.subject}</DialogTitle>
                <DialogDescription>
                  {course?.description}
                </DialogDescription>
              </DialogHeader>
              {teacher && (
                <div className="pt-4 mt-4 border-t">
                  <h3 className="font-semibold mb-3">Faculty Information</h3>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={teacher.avatar} alt={teacher.name} />
                      <AvatarFallback>{teacher.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <p className="font-bold text-lg">{teacher.name}</p>
                      <a href={`mailto:${teacher.email}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                        <Mail className="h-4 w-4" />
                        {teacher.email}
                      </a>
                      <a href={`tel:${teacher.phone}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                        <Phone className="h-4 w-4" />
                        {teacher.phone}
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
