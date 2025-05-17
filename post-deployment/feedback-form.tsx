"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"

export default function FeedbackForm() {
  const [formData, setFormData] = useState({
    rating: "",
    feedback: "",
    email: "",
    featureRequest: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRatingChange = (value: string) => {
    setFormData((prev) => ({ ...prev, rating: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      // In a real app, you would send this data to your backend
      console.log("Feedback submitted:", formData)
    }, 1500)
  }

  if (isSubmitted) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Thank You!</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Your feedback has been submitted. We appreciate your input and will use it to improve Fathia.</p>
        </CardContent>
        <CardFooter>
          <Button onClick={() => setIsSubmitted(false)}>Submit Another Response</Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Help Us Improve Fathia</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>How would you rate your experience with Fathia?</Label>
            <RadioGroup value={formData.rating} onValueChange={handleRatingChange} className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <div key={rating} className="flex flex-col items-center">
                  <RadioGroupItem value={rating.toString()} id={`rating-${rating}`} className="sr-only" />
                  <Label
                    htmlFor={`rating-${rating}`}
                    className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer ${
                      formData.rating === rating.toString() ? "bg-primary text-primary-foreground" : "bg-secondary"
                    }`}
                  >
                    {rating}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="feedback">What do you like or dislike about Fathia?</Label>
            <Textarea
              id="feedback"
              name="feedback"
              value={formData.feedback}
              onChange={handleChange}
              placeholder="Share your thoughts..."
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="featureRequest">What features would you like to see added?</Label>
            <Textarea
              id="featureRequest"
              name="featureRequest"
              value={formData.featureRequest}
              onChange={handleChange}
              placeholder="Suggest new features..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email (optional)</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
            />
            <p className="text-xs text-muted-foreground">
              We'll only use this to follow up on your feedback if needed.
            </p>
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Feedback"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
