"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export default function DeploymentVerification() {
  const [checks, setChecks] = useState({
    // Environment Variables
    envVariables: false,
    contractAddress: false,
    worldId: false,

    // Core Functionality
    authentication: false,
    walletConnection: false,
    worldIdVerification: false,
    moodSetting: false,
    moodHistory: false,
    globalMoods: false,

    // Cross-browser Testing
    chrome: false,
    firefox: false,
    safari: false,
    edge: false,

    // Mobile Testing
    ios: false,
    android: false,

    // Performance
    loadTime: false,
    transactions: false,
  })

  const updateCheck = (key: string) => {
    setChecks({
      ...checks,
      [key]: !checks[key as keyof typeof checks],
    })
  }

  const getCompletionPercentage = () => {
    const total = Object.keys(checks).length
    const completed = Object.values(checks).filter(Boolean).length
    return Math.round((completed / total) * 100)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Deployment Verification</span>
          <span className="text-sm font-normal">{getCompletionPercentage()}% Complete</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Environment Variables */}
        <div className="space-y-2">
          <h3 className="font-medium">Environment Variables</h3>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="envVariables"
                checked={checks.envVariables}
                onCheckedChange={() => updateCheck("envVariables")}
              />
              <Label htmlFor="envVariables">All environment variables are properly set</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="contractAddress"
                checked={checks.contractAddress}
                onCheckedChange={() => updateCheck("contractAddress")}
              />
              <Label htmlFor="contractAddress">Contract address is correct</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="worldId" checked={checks.worldId} onCheckedChange={() => updateCheck("worldId")} />
              <Label htmlFor="worldId">World ID app ID is correct</Label>
            </div>
          </div>
        </div>

        {/* Core Functionality */}
        <div className="space-y-2">
          <h3 className="font-medium">Core Functionality</h3>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="authentication"
                checked={checks.authentication}
                onCheckedChange={() => updateCheck("authentication")}
              />
              <Label htmlFor="authentication">Authentication works (sign up, sign in, sign out)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="walletConnection"
                checked={checks.walletConnection}
                onCheckedChange={() => updateCheck("walletConnection")}
              />
              <Label htmlFor="walletConnection">Wallet connection works properly</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="worldIdVerification"
                checked={checks.worldIdVerification}
                onCheckedChange={() => updateCheck("worldIdVerification")}
              />
              <Label htmlFor="worldIdVerification">World ID verification completes successfully</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="moodSetting"
                checked={checks.moodSetting}
                onCheckedChange={() => updateCheck("moodSetting")}
              />
              <Label htmlFor="moodSetting">Setting moods works and transactions confirm</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="moodHistory"
                checked={checks.moodHistory}
                onCheckedChange={() => updateCheck("moodHistory")}
              />
              <Label htmlFor="moodHistory">Mood history displays correctly</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="globalMoods"
                checked={checks.globalMoods}
                onCheckedChange={() => updateCheck("globalMoods")}
              />
              <Label htmlFor="globalMoods">Global moods tab works properly</Label>
            </div>
          </div>
        </div>

        {/* Cross-browser Testing */}
        <div className="space-y-2">
          <h3 className="font-medium">Cross-browser Testing</h3>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Checkbox id="chrome" checked={checks.chrome} onCheckedChange={() => updateCheck("chrome")} />
              <Label htmlFor="chrome">Chrome</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="firefox" checked={checks.firefox} onCheckedChange={() => updateCheck("firefox")} />
              <Label htmlFor="firefox">Firefox</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="safari" checked={checks.safari} onCheckedChange={() => updateCheck("safari")} />
              <Label htmlFor="safari">Safari</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="edge" checked={checks.edge} onCheckedChange={() => updateCheck("edge")} />
              <Label htmlFor="edge">Edge</Label>
            </div>
          </div>
        </div>

        {/* Mobile Testing */}
        <div className="space-y-2">
          <h3 className="font-medium">Mobile Testing</h3>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Checkbox id="ios" checked={checks.ios} onCheckedChange={() => updateCheck("ios")} />
              <Label htmlFor="ios">iOS devices</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="android" checked={checks.android} onCheckedChange={() => updateCheck("android")} />
              <Label htmlFor="android">Android devices</Label>
            </div>
          </div>
        </div>

        {/* Performance */}
        <div className="space-y-2">
          <h3 className="font-medium">Performance</h3>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Checkbox id="loadTime" checked={checks.loadTime} onCheckedChange={() => updateCheck("loadTime")} />
              <Label htmlFor="loadTime">Page load times are acceptable</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="transactions"
                checked={checks.transactions}
                onCheckedChange={() => updateCheck("transactions")}
              />
              <Label htmlFor="transactions">Transaction processing is smooth</Label>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
