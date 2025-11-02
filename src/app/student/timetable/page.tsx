
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
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
    setDate(new Date());
  }, []);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Attendance History</h1>
        <p className="text-muted-foreground">A log of all your past attendance records.</p>
      </div>
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-2">
                <ListCollapse className="h-5 w-5" />
                <CardTitle>History Log</CardTitle>
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full md:w-[280px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {isMounted && date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <CardDescription className="pt-2">
            A detailed record of your attendance. Select a date to view its history.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isMounted && <TimetableHistoryView selectedDate={date} />}
        </CardContent>
      </Card>
    </div>
  );
}
