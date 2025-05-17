"use client"

import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Sample data - in a real app, this would come from your backend
const data = [
  {
    name: "Mon",
    "Success Rate": 98,
    "Avg Gas (Gwei)": 25,
    "Tx Count": 42,
  },
  {
    name: "Tue",
    "Success Rate": 97,
    "Avg Gas (Gwei)": 28,
    "Tx Count": 38,
  },
  {
    name: "Wed",
    "Success Rate": 99,
    "Avg Gas (Gwei)": 22,
    "Tx Count": 45,
  },
  {
    name: "Thu",
    "Success Rate": 96,
    "Avg Gas (Gwei)": 30,
    "Tx Count": 50,
  },
  {
    name: "Fri",
    "Success Rate": 98,
    "Avg Gas (Gwei)": 27,
    "Tx Count": 55,
  },
  {
    name: "Sat",
    "Success Rate": 99,
    "Avg Gas (Gwei)": 20,
    "Tx Count": 60,
  },
  {
    name: "Sun",
    "Success Rate": 100,
    "Avg Gas (Gwei)": 18,
    "Tx Count": 48,
  },
]

export function TransactionMetrics() {
  return (
    <ChartContainer
      config={{
        "Success Rate": {
          label: "Success Rate (%)",
          color: "hsl(var(--chart-1))",
        },
        "Avg Gas (Gwei)": {
          label: "Avg Gas (Gwei)",
          color: "hsl(var(--chart-2))",
        },
        "Tx Count": {
          label: "Transaction Count",
          color: "hsl(var(--chart-3))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <Area
            type="monotone"
            dataKey="Success Rate"
            stroke="var(--color-Success Rate)"
            fill="var(--color-Success Rate)"
            fillOpacity={0.2}
          />
          <Area
            type="monotone"
            dataKey="Avg Gas (Gwei)"
            stroke="var(--color-Avg Gas (Gwei))"
            fill="var(--color-Avg Gas (Gwei))"
            fillOpacity={0.2}
          />
          <Area
            type="monotone"
            dataKey="Tx Count"
            stroke="var(--color-Tx Count)"
            fill="var(--color-Tx Count)"
            fillOpacity={0.2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
