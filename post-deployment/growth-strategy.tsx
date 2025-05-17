"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function GrowthStrategy() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Fathia Growth Strategy</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="user">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="user">User Growth</TabsTrigger>
            <TabsTrigger value="technical">Technical Scaling</TabsTrigger>
            <TabsTrigger value="business">Business Model</TabsTrigger>
          </TabsList>

          <TabsContent value="user" className="space-y-4">
            <h3 className="font-medium text-lg">User Acquisition & Retention</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Implement a referral program with incentives</li>
              <li>Create content marketing strategy focused on mental health and blockchain</li>
              <li>Develop partnerships with complementary services</li>
              <li>Optimize onboarding to reduce drop-off</li>
              <li>Implement re-engagement campaigns for inactive users</li>
              <li>Host virtual events and webinars</li>
              <li>Explore paid acquisition channels (SEM, social ads)</li>
            </ul>
          </TabsContent>

          <TabsContent value="technical" className="space-y-4">
            <h3 className="font-medium text-lg">Technical Scaling</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Implement caching strategies for blockchain data</li>
              <li>Optimize database queries and indexing</li>
              <li>Set up CDN for static assets</li>
              <li>Implement serverless functions for scalable backend</li>
              <li>Consider multi-region deployment for global users</li>
              <li>Optimize smart contract gas usage</li>
              <li>Implement load balancing for high traffic periods</li>
            </ul>
          </TabsContent>

          <TabsContent value="business" className="space-y-4">
            <h3 className="font-medium text-lg">Business Model Evolution</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Premium features for advanced mood analytics</li>
              <li>API access for third-party integrations</li>
              <li>Enterprise solutions for mental health professionals</li>
              <li>Data insights (anonymized and aggregated)</li>
              <li>Sponsored content or partnerships</li>
              <li>Token-based incentives and rewards</li>
              <li>Community-owned governance model</li>
            </ul>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
