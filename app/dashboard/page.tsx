"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { LogOut, RefreshCw, User, ShieldCheck, ShieldAlert } from "lucide-react"
import MoodSelector from "@/components/mood-selector"
import MoodHistory from "@/components/mood-history"
import GlobalMoods from "@/components/global-moods"
import WorldIDVerify from "@/components/WorldIDVerify"
import { NetworkIndicator } from "@/components/network-indicator"
import { TransactionStatus } from "@/components/transaction-status"
import { useAuth } from "@/providers/auth-provider"
import { useWallet } from "@/providers/wallet-provider"
import { useContract } from "@/hooks/use-contract"
import { useMobile } from "@/hooks/use-mobile"

export default function Dashboard() {
  const router = useRouter()
  const { user, isLoading: authLoading, signout } = useAuth()
  const { address, isConnected } = useWallet()
  const {
    currentMood,
    isLoadingMood,
    isSettingMood,
    fetchCurrentMood,
    setMood,
    isUserVerified,
    checkUserVerification,
    lastTransactionHash,
    resetTransactionHash,
  } = useContract()
  const isMobile = useMobile()

  const [activeTab, setActiveTab] = useState("my-mood")
  const [showVerification, setShowVerification] = useState(false)

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

    // Fetch current mood and verification status when component mounts
    if (isConnected && address) {
      fetchCurrentMood()
      checkUserVerification(address)
    }
  }, [authLoading, user, isConnected, address, router, fetchCurrentMood, checkUserVerification])

  const handleSignOut = async () => {
    await signout()
    router.push("/")
  }

  const handleSetMood = async (mood: string) => {
    if (!isUserVerified) {
      setShowVerification(true)
      return
    }

    await setMood(mood)
  }

  const handleVerificationSuccess = () => {
    setShowVerification(false)
    // Refresh verification status
    if (address) {
      checkUserVerification(address)
    }
  }

  const handleTransactionConfirmed = () => {
    // Refresh mood after transaction is confirmed
    fetchCurrentMood()
  }

  if (authLoading) {
    return (
      <div className="container max-w-md mx-auto p-4 min-h-screen flex items-center justify-center">
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
    )
  }

  return (
    <main className="container max-w-md mx-auto p-4 min-h-screen">
      <Card className="w-full">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">Mood Chain</CardTitle>
            <div className="flex items-center gap-2">
              <NetworkIndicator />
              <Button variant="ghost" size="icon" onClick={() => router.push("/profile")}>
                <User className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleSignOut}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <CardDescription>Record your mood on the blockchain</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="font-mono text-xs">
                {address?.slice(0, 6)}...{address?.slice(-4)}
              </Badge>
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
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={fetchCurrentMood}>
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <TransactionStatus
            txHash={lastTransactionHash}
            onConfirmed={handleTransactionConfirmed}
            resetTxHash={resetTransactionHash}
          />

          {showVerification ? (
            <div className="space-y-4 py-4">
              <h3 className="text-lg font-medium text-center">Verify Your Identity</h3>
              <p className="text-sm text-muted-foreground text-center mb-4">
                You need to verify your identity with World ID before setting your mood.
              </p>
              <WorldIDVerify mood={currentMood || "happy"} onVerificationSuccess={handleVerificationSuccess} />
              <Button variant="outline" className="w-full mt-2" onClick={() => setShowVerification(false)}>
                Cancel
              </Button>
            </div>
          ) : (
            <Tabs defaultValue="my-mood" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="my-mood">My Mood</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
                <TabsTrigger value="global">Global</TabsTrigger>
              </TabsList>

              <TabsContent value="my-mood" className="space-y-4">
                <div className="text-center py-2">
                  <h3 className="text-lg font-medium mb-1">Current Mood</h3>
                  {isLoadingMood ? (
                    <Skeleton className="h-8 w-32 mx-auto" />
                  ) : (
                    <div className="text-2xl font-bold">{currentMood || "No mood set"}</div>
                  )}
                </div>

                <Separator />

                <div className="py-2">
                  <h3 className="text-lg font-medium mb-3 text-center">Set New Mood</h3>
                  <MoodSelector onSelectMood={handleSetMood} isLoading={isSettingMood} />

                  {!isUserVerified && (
                    <p className="text-xs text-muted-foreground text-center mt-2">
                      You need to verify your identity with World ID before setting your mood.
                    </p>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="history">
                <MoodHistory />
              </TabsContent>

              <TabsContent value="global">
                <GlobalMoods />
              </TabsContent>
            </Tabs>
          )}
        </CardContent>
        <CardFooter className="text-xs text-center text-muted-foreground">
          All moods are stored on-chain and publicly visible
        </CardFooter>
      </Card>
    </main>
  )
}
