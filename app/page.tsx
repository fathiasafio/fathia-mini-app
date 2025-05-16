import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function Home() {
  return (
    <main className="container max-w-md mx-auto p-4 min-h-screen flex flex-col justify-center">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-3xl text-center">MoodChain</CardTitle>
          <CardDescription className="text-center text-lg">Record your mood on the blockchain</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <p>Express your feelings securely on the Base blockchain with World ID verification.</p>
          <div className="flex flex-col space-y-2">
            <Button asChild size="lg">
              <Link href="/signin">Sign In</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/signup">Create Account</Link>
            </Button>
          </div>
        </CardContent>
        <CardFooter className="text-center text-sm text-muted-foreground">Powered by Base & World ID</CardFooter>
      </Card>
    </main>
  )
}
