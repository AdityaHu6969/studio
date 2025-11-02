import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { TimetableHistoryView } from "@/components/student/timetable-history-view";
import { ListCollapse } from "lucide-react";

export default function TimetablePage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Attendance History</h1>
        <p className="text-muted-foreground">A log of all your past attendance records.</p>
      </div>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <ListCollapse className="h-5 w-5" />
            <CardTitle>History Log</CardTitle>
          </div>
          <CardDescription>
            A detailed record of your attendance for every class.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TimetableHistoryView />
        </CardContent>
      </Card>
    </div>
  );
}
