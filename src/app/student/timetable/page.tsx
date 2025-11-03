'use client';

import * as React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { TimetableHistoryView } from "@/components/student/timetable-history-view";
import { ListCollapse, Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar, CalendarProps } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format, isFuture, isSameDay, isSaturday, isSunday, startOfDay } from 'date-fns';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const officialHolidays: { date: Date; description: string }[] = [
  { date: new Date(2025, 7, 15), description: "Independence Day" }, // month is 0-indexed
  { date: new Date(2025, 9, 21), description: "Diwali" },
  { date: new Date(2025, 11, 25), description: "Christmas" },
];

const getHolidayDescription = (date: Date): string | undefined => {
  const startOfDate = startOfDay(date);
  return officialHolidays.find(holiday => isSameDay(startOfDate, holiday.date))?.description;
};

const isOfficialHoliday = (date: Date) => {
  return !!getHolidayDescription(date);
};

export default function AttendanceHistoryPage() {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(undefined);
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);

  React.useEffect(() => {
    // Set initial date only on the client after mount to avoid hydration mismatch
    setSelectedDate(new Date());
  }, []);

  const handleDateSelect = (date: Date | undefined) => {
    if (!date || isFuture(date)) return;
    setSelectedDate(date);
    setIsPopoverOpen(false); // Close popover after selection
  };
  
  const selectedDateForDisplay = selectedDate || new Date();

  const CustomDay: CalendarProps['components']['DayContent'] = ({ date, ...props }) => {
    const holidayDescription = getHolidayDescription(date);
    const isWeekend = isSaturday(date) || isSunday(date);
    const isAnOfficialHoliday = isOfficialHoliday(date);
    
    const day = <div className="relative flex h-full w-full items-center justify-center">
      {format(date, 'd')}
      {isAnOfficialHoliday && <div className="absolute bottom-1 h-1 w-1 rounded-full bg-orange-500" />}
      {!isAnOfficialHoliday && isWeekend && <div className="absolute bottom-1 h-1 w-1 rounded-full bg-destructive" />}
    </div>;

    if (holidayDescription) {
      return (
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>{day}</TooltipTrigger>
            <TooltipContent>
              <p>{holidayDescription}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }
    
    return day;
  };

  
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
                    components={{ DayContent: CustomDay }}
                    modifiers={{
                      holiday: (date) => (isSunday(date) || isSaturday(date)) && !isOfficialHoliday(date),
                      officialHoliday: isOfficialHoliday,
                    }}
                    modifiersClassNames={{
                      holiday: "day-holiday",
                      officialHoliday: "day-official-holiday",
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
