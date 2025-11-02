import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AttendanceBarChart } from "@/components/student/attendance-bar-chart";
import { AttendancePieChart } from "@/components/student/attendance-pie-chart";
import { Badge } from "@/components/ui/badge";

export default function StudentDashboardPage() {
  const overallAttendance = {
    total: 120,
    present: 102,
    absent: 18,
  };
  const percentage = Math.round((overallAttendance.present / overallAttendance.total) * 100);

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Welcome, Alex!</CardTitle>
          <CardDescription>Here's a summary of your attendance.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <p className="text-5xl font-bold">{percentage}%</p>
            <div className="flex flex-col">
              <p className="text-lg font-medium">Overall Attendance</p>
              <p className="text-sm text-muted-foreground">
                You are currently meeting the attendance requirements. Keep it up!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Attendance Breakdown</CardTitle>
            <CardDescription>Visual representation of your attendance.</CardDescription>
          </CardHeader>
          <CardContent>
            <AttendancePieChart data={overallAttendance} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Attendance by Subject</CardTitle>
            <CardDescription>Your attendance percentage in different subjects this semester.</CardDescription>
          </CardHeader>
          <CardContent>
            <AttendanceBarChart />
          </CardContent>
        </Card>
      </div>
       <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
           <div className="flex items-center justify-between">
              <div>
                  <p className="font-medium">Calculus II</p>
                  <p className="text-sm text-muted-foreground">Marked present by Dr. Evans</p>
              </div>
              <div className="text-right">
                  <Badge variant="secondary">Present</Badge>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
           </div>
           <div className="flex items-center justify-between">
              <div>
                  <p className="font-medium">Physics I</p>
                  <p className="text-sm text-muted-foreground">Marked absent by Dr. Smith</p>
              </div>
              <div className="text-right">
                  <Badge variant="destructive">Absent</Badge>
                  <p className="text-xs text-muted-foreground">Yesterday</p>
              </div>
           </div>
        </CardContent>
      </Card>
    </div>
  );
}
