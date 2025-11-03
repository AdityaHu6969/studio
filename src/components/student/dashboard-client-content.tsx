'use client';

import dynamic from 'next/dynamic';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const AttendanceBarChart = dynamic(() => import('@/components/student/attendance-bar-chart').then(mod => mod.AttendanceBarChart), { ssr: false, loading: () => <div className="w-full aspect-video flex items-center justify-center"><p>Loading Chart...</p></div> });
const AttendancePieChart = dynamic(() => import('@/components/student/attendance-pie-chart').then(mod => mod.AttendancePieChart), { ssr: false, loading: () => <div className="w-full aspect-square max-w-[250px] mx-auto flex items-center justify-center"><p>Loading Chart...</p></div> });

interface DashboardClientContentProps {
    overallAttendance: {
        total: number;
        present: number;
        absent: number;
    };
}

export function DashboardClientContent({ overallAttendance }: DashboardClientContentProps) {
    return (
        <>
            <Card className="animate-fade-in-up flex flex-col [animation-delay:100ms]">
                <CardHeader>
                    <CardTitle>Attendance Breakdown</CardTitle>
                    <CardDescription>Present vs. Absent classes.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-grow items-center justify-center">
                    <AttendancePieChart data={overallAttendance} />
                </CardContent>
            </Card>

            <Card className="animate-fade-in-up flex flex-col [animation-delay:200ms]">
                <CardHeader>
                    <CardTitle>Attendance by Subject</CardTitle>
                    <CardDescription>Your attendance percentage per subject.</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                    <AttendanceBarChart />
                </CardContent>
            </Card>
        </>
    );
}
