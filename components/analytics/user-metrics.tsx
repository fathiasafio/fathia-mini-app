"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Sample data - in a real app, this would come from your backend
const data = [
  {
    name: "Week 1",
    "New Users": 100,
    "Active Users": 95,
    "Returning Users": 0,
  },
  {
    name: "Week 2",
    "New Users": 85,
    "Active Users": 130,
    "Returning Users": 40,
  },
  {
    name: "Week 3",
    "New Users": 70,
    "Active Users": 155,
    "Returning Users": 65,
  },
  {
    name: "Week 4",
    "New Users": 65,
    "Active Users": 170,
    "Returning Users": 80,
  },
  {
    name: "Week 5",
    "New Users": 60,
    "Active Users": 190,
    "Returning Users": 95,
  },
  {
    name: "Week 6",
    "New Users": 55,
    "Active Users": 205,
    "Returning Users": 110,
  },
  {
    name: "Week 7",
    "New Users": 50,
    "Active Users": 220,
    "Returning Users": 125,
  },
  {
    name: "Week 8",
    "New Users": 45,
    "Active Users": 235,
    "Returning Users": 140,
  },
]

export function UserMetrics() {
  return (
    <ChartContainer
      config={{
        "New Users": {
          label: "New Users",
          color: "hsl(var(--chart-1))",
        },
        "Active Users": {
          label: "Active Users",
          color: "hsl(var(--chart-2))",
        },
        "Returning Users": {
          label: "Returning Users",
          color: "hsl(var(--chart-3))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <Bar dataKey="New Users" fill="var(--color-New Users)" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Active Users" fill="var(--color-Active Users)" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Returning Users" fill="var(--color-Returning Users)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
