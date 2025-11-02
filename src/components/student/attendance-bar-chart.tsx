"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { subject: "Math", attendance: 92 },
  { subject: "Science", attendance: 85 },
  { subject: "History", attendance: 95 },
  { subject: "English", attendance: 88 },
  { subject: "Art", attendance: 100 },
  { subject: "P.E.", attendance: 78 },
];

const chartConfig = {
  attendance: {
    label: "Attendance %",
    color: "hsl(var(--primary))",
  },
};

export function AttendanceBarChart() {
  return (
    <ChartContainer config={chartConfig} className="w-full aspect-video">
      <BarChart 
        accessibilityLayer 
        data={chartData}
        margin={{
            left: -10,
            right: 10,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="subject"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
         <YAxis
          type="number"
          domain={[50, 100]}
          tickFormatter={(tick) => `${tick}%`}
          width={35}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="attendance" fill="var(--color-attendance)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
