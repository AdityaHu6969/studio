
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
  const percentage = 85;

  const attendanceStatus = percentage >= 75
    ? "You are currently meeting the attendance requirements. Keep it up!"
    : "Your attendance is low. Please attend classes regularly.";
  const attendanceColor = percentage >= 75 ? "text-primary" : "text-yellow-500";
  
  const recentActivity = [
    { subject: "Calculus II", teacher: "Dr. Evans", status: "Present", time: "2 hours ago" },
    { subject: "Physics I", teacher: "Dr. Smith", status: "Absent", time: "Yesterday" },
    { subject: "History", teacher: "Dr. Jones", status: "Present", time: "2 days ago" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 h-full">
        <Card className="animate-fade-in-up flex flex-col">
          <CardHeader>
            <CardTitle>Welcome, Alex!</CardTitle>
            <CardDescription>Here's a summary of your attendance.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow flex items-center justify-center">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 w-full">
              <div className="relative h-32 w-32 shrink-0">
                <svg className="w-full h-full" viewBox="0 0 36 36">
                  <path
                    className="text-muted/50"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  />
                  <path
                    className="text-primary transition-all duration-1000 ease-out"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeDasharray={`${percentage}, 100`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                  <p className="text-3xl font-bold">{percentage}%</p>
                </div>
              </div>
              <div className="flex-1 text-center sm:text-left">
                <p className="text-xl font-semibold">Overall Attendance</p>
                <p className={`text-sm ${attendanceColor} mt-1`}>
                  {attendanceStatus}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="animate-fade-in-up flex flex-col">
          <CardHeader>
            <CardTitle>Attendance Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow flex items-center justify-center">
            <AttendancePieChart data={overallAttendance} />
          </CardContent>
        </Card>
        <Card className="animate-fade-in-up flex flex-col">
          <CardHeader>
            <CardTitle>Attendance by Subject</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
             <AttendanceBarChart />
          </CardContent>
        </Card>
        <Card className="animate-fade-in-up flex flex-col">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 flex-grow">
             {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start justify-between gap-4">
                    <div className="flex-grow">
                        <p className="font-medium">{activity.subject}</p>
                        <p className="text-sm text-muted-foreground">Marked by {activity.teacher}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                        <Badge variant={activity.status === 'Present' ? 'secondary' : 'destructive'}>{activity.status}</Badge>
                        <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                    </div>
                </div>
             ))}
          </CardContent>
        </Card>
    </div>
  );
}
