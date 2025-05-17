"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function MarketingPlan() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Fathia Marketing Plan</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="launch">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="launch">Launch</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
            <TabsTrigger value="partnerships">Partnerships</TabsTrigger>
          </TabsList>

          <TabsContent value="launch" className="space-y-4">
            <h3 className="font-medium text-lg">Launch Strategy</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Create a Product Hunt launch page</li>
              <li>Submit to Base ecosystem directories and dApp stores</li>
              <li>Announce on Twitter, Discord, and relevant crypto communities</li>
              <li>Create a launch video demonstrating the app</li>
              <li>Offer early adopter incentives (e.g., special badges)</li>
            </ul>
          </TabsContent>

          <TabsContent value="content" className="space-y-4">
            <h3 className="font-medium text-lg">Content Strategy</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Start a blog covering mood tracking, mental health, and blockchain</li>
              <li>Create tutorial videos for YouTube</li>
              <li>Develop infographics about mood trends from your platform</li>
              <li>Write guest posts for crypto and mental health publications</li>
              <li>Create a weekly mood report newsletter</li>
            </ul>
          </TabsContent>

          <TabsContent value="community" className="space-y-4">
            <h3 className="font-medium text-lg">Community Building</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Set up a Discord server with different channels for support, feedback, etc.</li>
              <li>Host weekly community calls or AMAs</li>
              <li>Create a referral program to incentivize user acquisition</li>
              <li>Organize virtual events around mental health awareness</li>
              <li>Implement community challenges and rewards</li>
            </ul>
          </TabsContent>

          <TabsContent value="partnerships" className="space-y-4">
            <h3 className="font-medium text-lg">Strategic Partnerships</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Partner with mental health apps and services</li>
              <li>Collaborate with Base ecosystem projects</li>
              <li>Connect with World ID for co-marketing opportunities</li>
              <li>Reach out to crypto influencers for reviews</li>
              <li>Explore integration possibilities with wallet providers</li>
            </ul>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
