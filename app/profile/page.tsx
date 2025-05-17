"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Loader2, ArrowLeft, ShieldCheck, ShieldAlert } from "lucide-react"
import WorldIDVerify from "@/components/WorldIDVerify"
import { useAuth } from "@/providers/auth-provider"
import { useWallet } from "@/providers/wallet-provider"
import { useContract } from "@/hooks/use-contract"
import { Logo } from "@/components/logo"

export default function Profile() {
  const router = useRouter()
  const { user, isLoading: authLoading, signout } = useAuth()
  const { address, isConnected, disconnectWallet } = useWallet()
  const { isUserVerified, checkUserVerification } = useContract()
  const [showVerification, setShowVerification] = useState(false)

  useEffect(() => {
    // If no user is logged in, redirect to sign in
    if (!authLoading && !user) {
      router.push("/signin")
      return
    }

    // Check verification status
    if (isConnected && address) {
      checkUserVerification(address)
    }
  }, [authLoading, user, isConnected, address, router, checkUserVerification])

  const handleSignOut = async () => {
    await signout()
    router.push("/")
  }

  const handleDisconnectWallet = () => {
    disconnectWallet()
    router.push("/connect-wallet")
  }

  const handleVerificationSuccess = () => {
    setShowVerification(false)
    // Refresh verification status
    if (address) {
      checkUserVerification(address)
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
    <main className="container max-w-md mx-auto p-4 min-h-screen">
      <Card className="w-full">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="icon" onClick={() => router.push("/dashboard")}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Logo size="sm" />
            <div className="w-8" />
          </div>
          <CardDescription className="text-center">Manage your account and wallet</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {showVerification ? (
            <div className="space-y-4 py-4">
              <h3 className="text-lg font-medium text-center">Verify Your Identity</h3>
              <p className="text-sm text-muted-foreground text-center mb-4">
                Verify with World ID to prove you're human and unlock all features.
              </p>
              <WorldIDVerify onVerificationSuccess={handleVerificationSuccess} />
              <Button variant="outline" className="w-full mt-2" onClick={() => setShowVerification(false)}>
                Cancel
              </Button>
            </div>
          ) : (
            <>
              <div>
                <h3 className="text-lg font-medium mb-2">Account Information</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Name</span>
                    <span>{user?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email</span>
                    <span>{user?.email}</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-medium mb-2">Wallet</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Address</span>
                    <Badge variant="outline" className="font-mono text-xs">
                      {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "Not connected"}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Verification</span>
                    {isUserVerified ? (
                      <Badge variant="success" className="bg-green-500 text-white">
                        <ShieldCheck className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    ) : (
                      <Badge variant="destructive">
                        <ShieldAlert className="h-3 w-3 mr-1" />
                        Not Verified
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  {!isUserVerified && (
                    <Button variant="outline" className="w-full" onClick={() => setShowVerification(true)}>
                      Verify with World ID
                    </Button>
                  )}
                  <Button variant="outline" className="w-full" onClick={handleDisconnectWallet}>
                    Disconnect Wallet
                  </Button>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-medium mb-2">Account Actions</h3>
                <Button variant="destructive" className="w-full" onClick={handleSignOut}>
                  Sign Out
                </Button>
              </div>
            </>
          )}
        </CardContent>
        <CardFooter className="text-xs text-center text-muted-foreground">
          Fathia - Powered by Base & World ID
        </CardFooter>
      </Card>
    </main>
  )
}
