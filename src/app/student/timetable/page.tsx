import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TimetableWeeklyView } from "@/components/student/timetable-weekly-view";
import { TimetableMonthlyView } from "@/components/student/timetable-monthly-view";
import { TimetableHistoryView } from "@/components/student/timetable-history-view";
import { CalendarDays, ListCollapse, GanttChartSquare } from "lucide-react";

export default function TimetablePage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <Tabs defaultValue="weekly" className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-3xl font-bold tracking-tight">My Timetable</h1>
            <p className="text-muted-foreground">View your schedule and track attendance.</p>
          </div>
          <TabsList>
            <TabsTrigger value="weekly">
              <GanttChartSquare className="mr-2 h-4 w-4" />
              Weekly
            </TabsTrigger>
            <TabsTrigger value="monthly">
              <CalendarDays className="mr-2 h-4 w-4" />
              Monthly
            </TabsTrigger>
            <TabsTrigger value="history">
              <ListCollapse className="mr-2 h-4 w-4" />
              History
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="weekly">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Schedule</CardTitle>
              <CardDescription>
                Hover over a class for details. Attendance is color-coded.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TimetableWeeklyView />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="monthly">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Overview</CardTitle>
              <CardDescription>
                Days are colored based on your attendance record.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TimetableMonthlyView />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="history">
           <Card>
            <CardHeader>
              <CardTitle>Attendance History</CardTitle>
              <CardDescription>
                A log of all your past attendance records.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TimetableHistoryView />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
