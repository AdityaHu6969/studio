"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, CheckCircle, XCircle, Clock } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const students = [
  { id: "S001", name: "Alice Johnson", avatar: "https://picsum.photos/seed/101/40/40" },
  { id: "S002", name: "Bob Williams", avatar: "https://picsum.photos/seed/102/40/40" },
  { id: "S003", name: "Charlie Brown", avatar: "https://picsum.photos/seed/103/40/40" },
  { id: "S004", name: "Diana Miller", avatar: "https://picsum.photos/seed/104/40/40" },
  { id: "S005", name: "Ethan Davis", avatar: "https://picsum.photos/seed/105/40/40" },
];

export default function AttendancePage() {
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
    setDate(new Date());
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mark Attendance</CardTitle>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-2">
            <Select>
              <SelectTrigger className="w-full md:w-[280px]">
                <SelectValue placeholder="Select a class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="math-101">Calculus II - Section A</SelectItem>
                <SelectItem value="phy-201">Physics I - Section B</SelectItem>
                <SelectItem value="cs-301">Data Structures - Section A</SelectItem>
              </SelectContent>
            </Select>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full md:w-[280px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {isMounted && date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
        </div>
      </CardHeader>
      <CardContent>
        <form>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={student.avatar} alt={student.name} />
                        <AvatarFallback>{student.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{student.name}</div>
                        <div className="text-sm text-muted-foreground">{student.id}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <RadioGroup defaultValue="present" className="flex justify-end gap-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="present" id={`present-${student.id}`} />
                        <Label htmlFor={`present-${student.id}`} className="flex items-center gap-1 cursor-pointer"><CheckCircle className="h-4 w-4 text-green-500" /> Present</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="absent" id={`absent-${student.id}`} />
                        <Label htmlFor={`absent-${student.id}`} className="flex items-center gap-1 cursor-pointer"><XCircle className="h-4 w-4 text-red-500" /> Absent</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="late" id={`late-${student.id}`} />
                        <Label htmlFor={`late-${student.id}`} className="flex items-center gap-1 cursor-pointer"><Clock className="h-4 w-4 text-yellow-500" /> Late</Label>
                      </div>
                    </RadioGroup>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex justify-end mt-6">
            <Button type="submit">Submit Attendance</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
