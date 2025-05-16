"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"
import { useAuth } from "@/providers/auth-provider"
import { useWallet } from "@/providers/wallet-provider"

export default function ConnectWallet() {
  const router = useRouter()
  const { user, isLoading: authLoading, updateUserWallet } = useAuth()
  const { address, isConnected, isConnecting, connectWallet } = useWallet()
  const [error, setError] = useState("")
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    // If no user is logged in, redirect to sign in
    if (!authLoading && !user) {
      router.push("/signin")
    }
  }, [authLoading, user, router])

  const handleConnectWallet = async () => {
    setError("")
    try {
      const walletAddress = await connectWallet()
      if (walletAddress) {
        setIsUpdating(true)
        await updateUserWallet(walletAddress)
        router.push("/verify")
      }
    } catch (err: any) {
      setError(err.message || "Failed to connect wallet")
    } finally {
      setIsUpdating(false)
    }
  }

  if (authLoading) {
    return (
      <div className="container max-w-md mx-auto p-4 min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <main className="container max-w-md mx-auto p-4 min-h-screen flex flex-col justify-center">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Connect Wallet</CardTitle>
          <CardDescription className="text-center">
            Connect your Ethereum wallet to interact with the blockchain
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center py-4">
            <p className="mb-4">You need to connect your wallet to record your moods on the Base blockchain.</p>
            <Button onClick={handleConnectWallet} className="w-full" disabled={isConnecting || isUpdating}>
              {isConnecting || isUpdating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isConnecting ? "Connecting Wallet..." : "Updating Profile..."}
                </>
              ) : (
                "Connect Wallet"
              )}
            </Button>
          </div>
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {isConnected && address && (
            <Alert>
              <AlertDescription>
                Connected: {address.slice(0, 6)}...{address.slice(-4)}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter className="text-center text-sm text-muted-foreground">
          Make sure you have MetaMask or another Ethereum wallet installed
        </CardFooter>
      </Card>
    </main>
  )
}
