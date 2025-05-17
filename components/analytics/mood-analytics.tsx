"use client"

import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Sample data - in a real app, this would come from your backend
const data = [
  { name: "Happy", value: 35 },
  { name: "Relaxed", value: 20 },
  { name: "Excited", value: 15 },
  { name: "Thoughtful", value: 10 },
  { name: "Tired", value: 8 },
  { name: "Sad", value: 7 },
  { name: "Angry", value: 3 },
  { name: "Cool", value: 2 },
]

export function MoodAnalytics() {
  return (
    <ChartContainer
      config={{
        Happy: {
          label: "Happy",
          color: "#4ade80",
        },
        Relaxed: {
          label: "Relaxed",
          color: "#60a5fa",
        },
        Excited: {
          label: "Excited",
          color: "#f472b6",
        },
        Thoughtful: {
          label: "Thoughtful",
          color: "#a78bfa",
        },
        Tired: {
          label: "Tired",
          color: "#94a3b8",
        },
        Sad: {
          label: "Sad",
          color: "#64748b",
        },
        Angry: {
          label: "Angry",
          color: "#ef4444",
        },
        Cool: {
          label: "Cool",
          color: "#3b82f6",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
          >
            {data.map((entry) => (
              <Cell key={`cell-${entry.name}`} fill={`var(--color-${entry.name})`} />
            ))}
          </Pie>
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
