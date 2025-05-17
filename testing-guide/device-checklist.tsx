"use client"

// Example device testing checklist component

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DeviceTestingChecklist() {
  const [checklist, setChecklist] = useState({
    // iOS Devices
    iPhoneLatest: false,
    iPhoneOlder: false,
    iPad: false,

    // Android Devices
    androidHighEnd: false,
    androidMidRange: false,
    androidTablet: false,

    // Desktop Browsers
    chrome: false,
    firefox: false,
    safari: false,
    edge: false,

    // Screen Sizes
    small: false,
    medium: false,
    large: false,
  })

  const updateChecklist = (key: string) => {
    setChecklist({
      ...checklist,
      [key]: !checklist[key as keyof typeof checklist],
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Device Testing Checklist</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <h3 className="font-medium">iOS Devices</h3>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="iPhoneLatest"
                checked={checklist.iPhoneLatest}
                onCheckedChange={() => updateChecklist("iPhoneLatest")}
              />
              <Label htmlFor="iPhoneLatest">Latest iPhone (13/14/15)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="iPhoneOlder"
                checked={checklist.iPhoneOlder}
                onCheckedChange={() => updateChecklist("iPhoneOlder")}
              />
              <Label htmlFor="iPhoneOlder">Older iPhone (X/11/12)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="iPad" checked={checklist.iPad} onCheckedChange={() => updateChecklist("iPad")} />
              <Label htmlFor="iPad">iPad</Label>
            </div>
          </div>
        </div>

        {/* Android Devices Section */}
        <div className="space-y-2">
          <h3 className="font-medium">Android Devices</h3>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="androidHighEnd"
                checked={checklist.androidHighEnd}
                onCheckedChange={() => updateChecklist("androidHighEnd")}
              />
              <Label htmlFor="androidHighEnd">High-end Android (Samsung Galaxy, Google Pixel)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="androidMidRange"
                checked={checklist.androidMidRange}
                onCheckedChange={() => updateChecklist("androidMidRange")}
              />
              <Label htmlFor="androidMidRange">Mid-range Android</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="androidTablet"
                checked={checklist.androidTablet}
                onCheckedChange={() => updateChecklist("androidTablet")}
              />
              <Label htmlFor="androidTablet">Android Tablet</Label>
            </div>
          </div>
        </div>

        {/* Desktop Browsers Section */}
        <div className="space-y-2">
          <h3 className="font-medium">Desktop Browsers</h3>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Checkbox id="chrome" checked={checklist.chrome} onCheckedChange={() => updateChecklist("chrome")} />
              <Label htmlFor="chrome">Chrome</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="firefox" checked={checklist.firefox} onCheckedChange={() => updateChecklist("firefox")} />
              <Label htmlFor="firefox">Firefox</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="safari" checked={checklist.safari} onCheckedChange={() => updateChecklist("safari")} />
              <Label htmlFor="safari">Safari</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="edge" checked={checklist.edge} onCheckedChange={() => updateChecklist("edge")} />
              <Label htmlFor="edge">Edge</Label>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
