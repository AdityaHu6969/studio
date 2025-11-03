'use client';

import * as React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { TimetableHistoryView } from "@/components/student/timetable-history-view";
import { ListCollapse, Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar, CalendarProps } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format, isFuture, isSaturday, isSunday } from 'date-fns';

export default function AttendanceHistoryPage() {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(undefined);
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);

  React.useEffect(() => {
    // Set initial date only on the client after mount to avoid hydration mismatch
    setSelectedDate(new Date());
  }, []);

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    setSelectedDate(date);
    setIsPopoverOpen(false); // Close popover after selection
  };
  
  const selectedDateForDisplay = selectedDate || new Date();
  
  if (selectedDate === undefined) {
    // Render a skeleton loading state on the server and initial client render
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Attendance History</h1>
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
                <div className="w-full md:w-[280px] h-10 bg-muted rounded-md animate-pulse" />
            </div>
          </CardContent>
        </Card>
         <Card className="mt-6">
          <CardHeader>
              <CardTitle>Records for ...</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-96 w-full rounded-md border p-4">
                <div className="flex h-full min-h-[200px] items-center justify-center text-muted-foreground">
                    <p>Loading...</p>
                </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Attendance History</h1>
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
                      !selectedDateForDisplay && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDateForDisplay ? format(selectedDateForDisplay, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={selectedDateForDisplay}
                    onSelect={handleDateSelect}
                    initialFocus
                    disabled={isFuture}
                    modifiers={{
                      holiday: (date) => isSunday(date) || isSaturday(date),
                    }}
                    modifiersClassNames={{
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
            <CardTitle>Records for {selectedDateForDisplay ? format(selectedDateForDisplay, "PPP") : '...'}</CardTitle>
        </CardHeader>
        <CardContent>
          <TimetableHistoryView selectedDate={selectedDateForDisplay} />
        </CardContent>
      </Card>
    </div>
  );
}
