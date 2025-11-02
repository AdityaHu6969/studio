import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserManagementTable } from "@/components/admin/user-management-table";
import { Users, UserCog, Shield } from "lucide-react";

export default function AdminDashboardPage() {
  const stats = [
    { title: "Total Users", value: "1,254", icon: <Users className="h-6 w-6 text-muted-foreground" /> },
    { title: "Students", value: "1,100", icon: <Users className="h-6 w-6 text-muted-foreground" /> },
    { title: "Teachers", value: "150", icon: <UserCog className="h-6 w-6 text-muted-foreground" /> },
    { title: "Admins", value: "4", icon: <Shield className="h-6 w-6 text-muted-foreground" /> },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      <UserManagementTable />
    </div>
  );
}
