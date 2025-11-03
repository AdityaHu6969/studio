'use client';

import * as React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, Phone, Clock } from "lucide-react";
import { scheduleData, days, timeSlots, getSubjectColor, Period, Teacher, Course, teachers, courseDetails } from '@/components/student/timetable';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '../ui/card';

export function TimetableDailyView() {
  const [selectedPeriod, setSelectedPeriod] = React.useState<{ period: Period, day: string, time: string } | null>(null);
  const [activeTab, setActiveTab] = React.useState(days[new Date().getDay() - 1] || days[0]);

  const handlePeriodClick = (period: Period, day: string, time: string) => {
    if (period.subject !== "Lunch" && period.subject !== "Free Period") {
      setSelectedPeriod({ period, day, time });
    }
  };

  const teacher = selectedPeriod ? teachers[selectedPeriod.period.teacher] : null;
  const course = selectedPeriod ? courseDetails[selectedPeriod.period.subject] : null;

  return (
    <>
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full animate-fade-in-up">
        <TabsList className="grid w-full grid-cols-5 h-auto">
          {days.map(day => (
            <TabsTrigger key={day} value={day} className="text-xs px-1">
              {day.substring(0, 3)}
            </TabsTrigger>
          ))}
        </TabsList>
        {days.map(day => (
          <TabsContent key={day} value={day}>
            <Card>
                <CardContent className="p-4 space-y-3">
                    {timeSlots.map((time, timeIndex) => {
                        const period = scheduleData[time]?.[day];
                        if (!period) return null;
                        
                        const isClickable = period.subject !== "Lunch" && period.subject !== "Free Period";

                        return (
                            <div
                                key={`${time}-${day}`}
                                onClick={() => handlePeriodClick(period, day, time)}
                                className={cn(
                                    "flex items-center gap-4 p-3 rounded-lg transition-all duration-200 ease-in-out",
                                    isClickable && "cursor-pointer hover:scale-[1.02] hover:shadow-md",
                                    getSubjectColor(period.subject)
                                )}
                                style={{ animation: `fade-in-up 0.5s ${timeIndex * 0.05}s ease-out forwards`, opacity: 0 }}
                            >
                                <div className="flex flex-col items-center justify-center w-16 text-center">
                                    <Clock className="h-4 w-4 mb-1 opacity-80" />
                                    <span className="text-xs font-medium opacity-80">{time.split('-')[0]}</span>
                                </div>
                                <div className="flex-grow">
                                    <p className="font-bold">{period.subject}</p>
                                    <p className="text-sm opacity-80">{period.teacher}</p>
                                </div>
                            </div>
                        )
                    })}
                </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

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
    </>
  );
}
