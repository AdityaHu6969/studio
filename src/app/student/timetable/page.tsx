import { Timetable } from "@/components/student/timetable";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Info } from "lucide-react";

export default function TimetablePage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <Card>
        <CardHeader>
          <CardTitle>My Weekly Timetable</CardTitle>
          <CardDescription className="flex items-center gap-2 pt-1">
            <Info className="h-4 w-4" />
            <span>Hover over a class for more details. Attendance status is shown with colors.</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Timetable />
        </CardContent>
      </Card>
    </div>
  );
}
