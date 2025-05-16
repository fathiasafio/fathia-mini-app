"use client"

import { useEffect, useState } from "react"
import { useContract } from "@/hooks/use-contract"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { formatDistanceToNow } from "date-fns"

interface GlobalMoodData {
  address: string
  mood: string
  timestamp: number
}

export default function GlobalMoods() {
  const { getAllLatestMoods } = useContract()
  const [globalMoods, setGlobalMoods] = useState<GlobalMoodData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchGlobalMoods = async () => {
      setIsLoading(true)
      try {
        const moods = await getAllLatestMoods()
        setGlobalMoods(moods)
      } catch (error) {
        console.error("Failed to fetch global moods:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchGlobalMoods()
  }, [getAllLatestMoods])

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <div className="flex justify-between items-center">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (globalMoods.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No global moods found yet. Be the first to set your mood!
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {globalMoods.map((item, index) => (
        <Card key={index}>
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="font-mono text-xs text-muted-foreground">
                {item.address.slice(0, 6)}...{item.address.slice(-4)}
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">{item.mood}</span>
                <span className="text-sm text-muted-foreground">
                  {formatDistanceToNow(new Date(item.timestamp), { addSuffix: true })}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
