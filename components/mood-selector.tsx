"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

interface MoodSelectorProps {
  onSelectMood: (mood: string) => Promise<void>
  isLoading: boolean
}

export default function MoodSelector({ onSelectMood, isLoading }: MoodSelectorProps) {
  const [selectedMood, setSelectedMood] = useState<string | null>(null)

  const moods = [
    { name: "Happy", emoji: "😊" },
    { name: "Sad", emoji: "😢" },
    { name: "Angry", emoji: "😠" },
    { name: "Excited", emoji: "🤩" },
    { name: "Relaxed", emoji: "😌" },
    { name: "Tired", emoji: "😴" },
    { name: "Thoughtful", emoji: "🤔" },
    { name: "Cool", emoji: "😎" },
  ]

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood)
  }

  const handleSubmit = async () => {
    if (selectedMood) {
      await onSelectMood(selectedMood)
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-2">
        {moods.map((mood) => (
          <Button
            key={mood.name}
            variant={selectedMood === mood.name ? "default" : "outline"}
            className="flex flex-col items-center justify-center h-16 p-1"
            onClick={() => handleMoodSelect(mood.name)}
            disabled={isLoading}
          >
            <span className="text-xl">{mood.emoji}</span>
            <span className="text-xs mt-1">{mood.name}</span>
          </Button>
        ))}
      </div>

      <Button className="w-full" onClick={handleSubmit} disabled={!selectedMood || isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Setting Mood...
          </>
        ) : (
          "Set Mood"
        )}
      </Button>
    </div>
  )
}
