"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"
import { useAuth } from "@/providers/auth-provider"
import { useWallet } from "@/providers/wallet-provider"
import { useContract } from "@/hooks/use-contract"
import WorldIDVerify from "@/components/WorldIDVerify"
import { Logo } from "@/components/logo"

export default function Verify() {
  const router = useRouter()
  const { user, isLoading: authLoading } = useAuth()
  const { address, isConnected } = useWallet()
  const { isUserVerified, checkUserVerification } = useContract()
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    // If no user is logged in, redirect to sign in
    if (!authLoading && !user) {
      router.push("/signin")
      return
    }

    // If user has no wallet connected, redirect to connect wallet
    if (!authLoading && user && !user.walletAddress) {
      router.push("/connect-wallet")
      return
    }

    // Check if user is already verified
    const checkVerification = async () => {
      if (isConnected && address) {
        await checkUserVerification(address)
        setIsChecking(false)
      }
    }

    checkVerification()
  }, [authLoading, user, isConnected, address, router, checkUserVerification])

  const handleVerificationSuccess = () => {
    // Redirect to dashboard after successful verification
    router.push("/dashboard")
  }

  const handleSkip = () => {
    router.push("/dashboard")
  }

  if (authLoading || isChecking) {
    return (
      <div className="container max-w-md mx-auto p-4 min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  // If already verified, redirect to dashboard
  if (isUserVerified) {
    router.push("/dashboard")
    return null
  }

  return (
    <main className="container max-w-md mx-auto p-4 min-h-screen flex flex-col justify-center">
      <Card className="w-full">
        <CardHeader className="flex flex-col items-center">
          <Logo size="md" className="mb-4" />
          <CardTitle className="text-2xl text-center">Verify Your Identity</CardTitle>
          <CardDescription className="text-center">Verify with World ID to prove you're human</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center py-2">
            <p className="mb-4">
              Verification is required to set your mood on the blockchain. This helps prevent spam and ensures each
              person can only set their own mood.
            </p>
          </div>

          <WorldIDVerify onVerificationSuccess={handleVerificationSuccess} />

          <Alert>
            <AlertDescription>
              World ID uses zero-knowledge proofs to verify your identity without revealing personal information.
            </AlertDescription>
          </Alert>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button variant="ghost" onClick={handleSkip}>
            Skip for now
          </Button>
        </CardFooter>
      </Card>
    </main>
  )
}
