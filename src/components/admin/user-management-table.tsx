import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

const users = [
    { id: 'usr_1', name: 'Alex Johnson', email: 'alex.j@example.com', role: 'Student', avatar: 'https://picsum.photos/seed/101/40/40' },
    { id: 'usr_2', name: 'Dr. Evelyn Reed', email: 'e.reed@patel.edu', role: 'Teacher', avatar: 'https://picsum.photos/seed/201/40/40' },
    { id: 'usr_3', name: 'Jane Doe', email: 'jane.d@patel.edu', role: 'Admin', avatar: 'https://picsum.photos/seed/301/40/40' },
    { id: 'usr_4', name: 'Bob Williams', email: 'bob.w@example.com', role: 'Student', avatar: 'https://picsum.photos/seed/102/40/40' },
    { id: 'usr_5', name: 'Super Admin', email: 'god.admin@patel.edu', role: 'God Admin', avatar: 'https://picsum.photos/seed/302/40/40' }
];

// In a real app, this would come from a context or hook
const isGodAdmin = true;

const roleVariant: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
    'Student': 'secondary',
    'Teacher': 'outline',
    'Admin': 'default',
    'God Admin': 'destructive'
}

export function UserManagementTable() {
  return (
    <Card>
        <CardHeader>
            <CardTitle>Users</CardTitle>
            <CardDescription>A list of all users in the system.</CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto">
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users.map((user) => (
                <TableRow key={user.id}>
                    <TableCell>
                    <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                        <div className="font-medium whitespace-nowrap">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                        </div>
                    </div>
                    </TableCell>
                    <TableCell>
                        <Badge variant={roleVariant[user.role] || 'secondary'} className="whitespace-nowrap">{user.role}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                        <DropdownMenuItem>Edit User</DropdownMenuItem>
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        {isGodAdmin && <DropdownMenuItem className="text-destructive focus:bg-destructive/10 focus:text-destructive">Delete User</DropdownMenuItem>}
                        </DropdownMenuContent>
                    </DropdownMenu>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </CardContent>
    </Card>
  );
}
