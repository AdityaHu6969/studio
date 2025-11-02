import { Timetable } from "@/components/student/timetable";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function TimetablePage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Weekly Timetable</CardTitle>
        <CardDescription>
          Here is your class schedule for the week.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Timetable />
      </CardContent>
    </Card>
  );
}
