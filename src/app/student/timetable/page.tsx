
'use client';

import * as React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { TimetableHistoryView } from "@/components/student/timetable-history-view";
import { ListCollapse, Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format, isFuture, isSameDay, isSunday } from 'date-fns';

export default function TimetablePage() {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date());
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    // We only disable future dates in the calendar itself.
    // The logic to show "Upcoming" is in TimetableHistoryView.
    setSelectedDate(date);
    setIsPopoverOpen(false); // Close popover on date select
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Attendance & History</h1>
        <p className="text-muted-foreground">Review your past attendance records by selecting a date.</p>
      </div>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
              <ListCollapse className="h-5 w-5" />
              <CardTitle>History Log</CardTitle>
          </div>
          <CardDescription className="pt-2">
            Select a date to view a detailed record of your attendance for that day.
          </CardDescription>
        </CardHeader>
        <CardContent>
           <div className="flex flex-col items-start gap-4 md:flex-row">
              <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full md:w-[280px] justify-start text-left font-normal",
                      !selectedDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {isMounted && selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={handleDateSelect}
                    initialFocus
                    disabled={(date) => isFuture(date) && !isSameDay(date, new Date())}
                    modifiers={{
                      holiday: (date) => isSunday(date),
                    }}
                    modifiersClassNames={{
                      selected: "day-selected",
                      today: "day-today",
                      holiday: "day-holiday",
                    }}
                  />
                </PopoverContent>
              </Popover>
          </div>
        </CardContent>
      </Card>
       <Card className="mt-6">
        <CardHeader>
            <CardTitle>Records for {isMounted && selectedDate ? format(selectedDate, "PPP") : '...'}</CardTitle>
        </CardHeader>
        <CardContent>
          {isMounted && <TimetableHistoryView selectedDate={selectedDate} />}
        </CardContent>
      </Card>
    </div>
  );
}
