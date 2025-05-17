"use client"

import { Line, LineChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Sample data - in a real app, this would come from your backend
const data = [
  {
    name: "Jan",
    Organic: 40,
    Referral: 24,
    Social: 18,
  },
  {
    name: "Feb",
    Organic: 45,
    Referral: 28,
    Social: 22,
  },
  {
    name: "Mar",
    Organic: 55,
    Referral: 35,
    Social: 28,
  },
  {
    name: "Apr",
    Organic: 65,
    Referral: 40,
    Social: 32,
  },
  {
    name: "May",
    Organic: 75,
    Referral: 48,
    Social: 38,
  },
  {
    name: "Jun",
    Organic: 90,
    Referral: 55,
    Social: 42,
  },
]

export function AcquisitionChart() {
  return (
    <ChartContainer
      config={{
        Organic: {
          label: "Organic",
          color: "hsl(var(--chart-1))",
        },
        Referral: {
          label: "Referral",
          color: "hsl(var(--chart-2))",
        },
        Social: {
          label: "Social",
          color: "hsl(var(--chart-3))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <Line
            type="monotone"
            dataKey="Organic"
            stroke="var(--color-Organic)"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="Referral"
            stroke="var(--color-Referral)"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="Social"
            stroke="var(--color-Social)"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
