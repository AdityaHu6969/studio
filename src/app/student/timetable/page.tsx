
'use client';

import * as React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { TimetableHistoryView } from "@/components/student/timetable-history-view";
import { ListCollapse, Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

export default function TimetablePage() {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(undefined);
  const [confirmedDate, setConfirmedDate] = React.useState<Date | undefined>(undefined);
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    const today = new Date();
    setSelectedDate(today);
    setConfirmedDate(today);
    setIsMounted(true);
  }, []);

  const handleViewHistory = () => {
    setConfirmedDate(selectedDate);
  };

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
           <div className="flex flex-col md:flex-row items-start gap-4">
              <Popover>
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
                    onSelect={setSelectedDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <Button onClick={handleViewHistory}>View History</Button>
          </div>
        </CardContent>
      </Card>
       <Card className="mt-6">
        <CardHeader>
            <CardTitle>Records for {isMounted && confirmedDate ? format(confirmedDate, "PPP") : '...'}</CardTitle>
        </CardHeader>
        <CardContent>
          {isMounted && <TimetableHistoryView selectedDate={confirmedDate} />}
        </CardContent>
      </Card>
    </div>
  );
}
