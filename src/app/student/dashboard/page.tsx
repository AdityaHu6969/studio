
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
    { subject: "Calculus II", teacher: "Dr. Evans", status: "Present", time: "3 days ago" },
    { subject: "Physics I", teacher: "Dr. Smith", status: "Present", time: "4 days ago" },
    { subject: "Chemistry I", teacher: "Dr. Reed", status: "Present", time: "4 days ago" },
  ];

  return (
    <div className="w-full h-full flex flex-col">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
        
        <Card className="animate-fade-in-up flex flex-col">
          <CardHeader>
            <CardTitle>Welcome, Alex!</CardTitle>
            <CardDescription>Here's a summary of your attendance.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-grow flex-col items-center justify-center sm:flex-row sm:gap-6">
              <div className="relative h-32 w-32 shrink-0 sm:h-40 sm:w-40">
                <svg className="h-full w-full" viewBox="0 0 36 36">
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
                <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-3xl font-bold sm:text-4xl">{percentage}%</p>
                </div>
              </div>
              <div className="mt-4 flex-1 text-center sm:mt-0 sm:text-left">
                <p className="text-xl font-semibold">Overall Attendance</p>
                <p className={`mt-1 text-sm ${attendanceColor}`}>
                  {attendanceStatus}
                </p>
              </div>
          </CardContent>
        </Card>

        <Card className="animate-fade-in-up flex flex-col">
          <CardHeader>
            <CardTitle>Attendance Breakdown</CardTitle>
            <CardDescription>Present vs. Absent classes.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-grow items-center justify-center">
            <AttendancePieChart data={overallAttendance} />
          </CardContent>
        </Card>

        <Card className="animate-fade-in-up flex flex-col">
          <CardHeader>
            <CardTitle>Attendance by Subject</CardTitle>
            <CardDescription>Your attendance percentage per subject.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
             <AttendanceBarChart />
          </CardContent>
        </Card>

        <Card className="animate-fade-in-up flex flex-col">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest attendance records.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-grow flex-col space-y-4">
             {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start justify-between gap-4">
                    <div className="flex-grow">
                        <p className="font-medium">{activity.subject}</p>
                        <p className="text-sm text-muted-foreground">Marked by {activity.teacher}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                        <Badge variant={activity.status === 'Present' ? 'secondary' : 'destructive'}>{activity.status}</Badge>
                        <p className="mt-1 text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                </div>
             ))}
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
