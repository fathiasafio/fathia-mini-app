"use client"

import { IDKitWidget } from "@worldcoin/idkit"
import { useEffect, useState } from "react"
import { ethers } from "ethers"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"
import { CONTRACT_ADDRESS, CONTRACT_ABI, WORLD_ID_APP_ID } from "@/constants"
import { useWallet } from "@/providers/wallet-provider"
import { useToast } from "@/components/ui/use-toast"

interface WorldIDVerifyProps {
  mood?: string
  onVerificationSuccess?: () => void
}

export default function WorldIDVerify({ mood = "happy", onVerificationSuccess }: WorldIDVerifyProps) {
  const { address, isConnected, connectWallet } = useWallet()
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null)
  const [signer, setSigner] = useState<ethers.Signer | null>(null)
  const [result, setResult] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum && isConnected) {
      const ethProvider = new ethers.providers.Web3Provider(window.ethereum as any)
      setProvider(ethProvider)
      setSigner(ethProvider.getSigner())
    }
  }, [isConnected])

  const handleConnectWallet = async () => {
    setIsConnecting(true)
    try {
      await connectWallet()
    } catch (error) {
      console.error("Error connecting wallet:", error)
      setResult("Failed to connect wallet. Please try again.")
    } finally {
      setIsConnecting(false)
    }
  }

  const handleProof = async (proofData: any) => {
    try {
      setIsVerifying(true)

      if (!signer) {
        setResult("Please connect your wallet first.")
        setIsVerifying(false)
        return
      }

      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer)

      const { merkle_root: root, nullifier_hash: nullifierHash, proof } = proofData

      // Use the connected wallet address as the signal
      const signalAddress = address || (await signer.getAddress())

      toast({
        title: "Verifying Identity",
        description: "Please confirm the transaction in your wallet.",
      })

      const tx = await contract.verifyUser(root, nullifierHash, proof, signalAddress)

      toast({
        title: "Transaction Submitted",
        description: "Your verification is being processed on the blockchain.",
      })

      await tx.wait()

      setResult("✅ Identity verified successfully!")
      toast({
        title: "Verification Successful",
        description: "Your identity has been verified with World ID.",
      })

      // Call the callback if provided
      if (onVerificationSuccess) {
        onVerificationSuccess()
      }
    } catch (err) {
      console.error("Verification error:", err)
      setResult("❌ Verification failed. Please try again.")
      toast({
        title: "Verification Failed",
        description: "Could not verify your identity. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsVerifying(false)
    }
  }

  return (
    <div className="space-y-4">
      {!isConnected && (
        <Button onClick={handleConnectWallet} className="w-full" disabled={isConnecting}>
          {isConnecting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Connecting Wallet...
            </>
          ) : (
            "Connect Wallet for Verification"
          )}
        </Button>
      )}

      {isConnected && (
        <IDKitWidget
          app_id={WORLD_ID_APP_ID || ""}
          action="moodcast"
          signal={address || ""}
          onSuccess={handleProof}
          credential_types={["orb"]} // or ["phone"]
        >
          {({ open }) => (
            <Button onClick={open} variant="secondary" className="w-full" disabled={isVerifying}>
              {isVerifying ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying Identity...
                </>
              ) : (
                "Verify with World ID"
              )}
            </Button>
          )}
        </IDKitWidget>
      )}

      {result && (
        <Alert variant={result.includes("✅") ? "default" : "destructive"}>
          <AlertDescription>{result}</AlertDescription>
        </Alert>
      )}
    </div>
  )
}
