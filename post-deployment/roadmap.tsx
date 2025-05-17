"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProductRoadmap() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Fathia Development Roadmap</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="q1">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="q1">Q1</TabsTrigger>
            <TabsTrigger value="q2">Q2</TabsTrigger>
            <TabsTrigger value="q3">Q3</TabsTrigger>
            <TabsTrigger value="q4">Q4</TabsTrigger>
          </TabsList>

          <TabsContent value="q1" className="space-y-4">
            <h3 className="font-medium text-lg">Q1: Foundation & Stability</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Bug fixes and performance optimizations</li>
              <li>Improved error handling for blockchain transactions</li>
              <li>Enhanced mobile responsiveness</li>
              <li>Comprehensive analytics implementation</li>
              <li>Documentation and knowledge base creation</li>
            </ul>
          </TabsContent>

          <TabsContent value="q2" className="space-y-4">
            <h3 className="font-medium text-lg">Q2: User Experience Enhancements</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Dark mode implementation</li>
              <li>Custom mood creation</li>
              <li>Mood analytics and insights</li>
              <li>Push notifications for transaction confirmations</li>
              <li>Social sharing capabilities</li>
            </ul>
          </TabsContent>

          <TabsContent value="q3" className="space-y-4">
            <h3 className="font-medium text-lg">Q3: Social & Community Features</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Friend connections and following</li>
              <li>Private mood sharing with trusted contacts</li>
              <li>Community challenges and events</li>
              <li>Integration with social platforms</li>
              <li>Mood-based community groups</li>
            </ul>
          </TabsContent>

          <TabsContent value="q4" className="space-y-4">
            <h3 className="font-medium text-lg">Q4: Expansion & Ecosystem</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Multi-chain support (Ethereum, Optimism, etc.)</li>
              <li>API for third-party integrations</li>
              <li>Mobile app development</li>
              <li>Advanced mood analytics with AI insights</li>
              <li>Tokenization and rewards system</li>
            </ul>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
