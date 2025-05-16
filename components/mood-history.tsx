"use client"

import { useEffect, useState } from "react"
import { useContract } from "@/hooks/use-contract"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { formatDistanceToNow } from "date-fns"

interface MoodData {
  mood: string
  timestamp: number
}

export default function MoodHistory() {
  const { getMoodHistory } = useContract()
  const [moodHistory, setMoodHistory] = useState<MoodData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchHistory = async () => {
      setIsLoading(true)
      try {
        const history = await getMoodHistory()
        setMoodHistory(history)
      } catch (error) {
        console.error("Failed to fetch mood history:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchHistory()
  }, [getMoodHistory])

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-32" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (moodHistory.length === 0) {
    return <div className="text-center py-8 text-muted-foreground">No mood history found. Set your first mood!</div>
  }

  return (
    <div className="space-y-3">
      {moodHistory.map((item, index) => (
        <Card key={index}>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">{item.mood}</span>
              <span className="text-sm text-muted-foreground">
                {formatDistanceToNow(new Date(item.timestamp), { addSuffix: true })}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
