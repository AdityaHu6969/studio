'use client';

import * as React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { TimetableWeeklyView } from '@/components/student/timetable-weekly-view';
import { TimetableDailyView } from '@/components/student/timetable-daily-view';

export default function TimetablePage() {
  const isMobile = useIsMobile();

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Weekly Timetable</h1>
        <p className="text-muted-foreground">
          {isMobile
            ? 'Your daily class schedule. Select a day to view.'
            : 'Your weekly class schedule. Click a class for more details.'}
        </p>
      </div>
      {isMobile ? <TimetableDailyView /> : <TimetableWeeklyView />}
    </div>
  );
}
