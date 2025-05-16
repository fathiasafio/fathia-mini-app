"use client"

import { useState, useEffect } from "react"
import { ethers } from "ethers"
import { Loader2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

interface TransactionStatusProps {
  txHash: string | null
  onConfirmed?: () => void
  resetTxHash: () => void
}

export function TransactionStatus({ txHash, onConfirmed, resetTxHash }: TransactionStatusProps) {
  const [status, setStatus] = useState<"pending" | "confirmed" | "failed" | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    if (!txHash) {
      setStatus(null)
      return
    }

    setStatus("pending")

    const checkTransaction = async () => {
      if (typeof window === "undefined" || !window.ethereum || !txHash) return

      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum as any)

        // Wait for transaction to be mined
        const receipt = await provider.waitForTransaction(txHash)

        if (receipt.status === 1) {
          setStatus("confirmed")
          toast({
            title: "Transaction Confirmed",
            description: "Your transaction has been confirmed on the blockchain.",
          })
          if (onConfirmed) onConfirmed()
        } else {
          setStatus("failed")
          toast({
            title: "Transaction Failed",
            description: "Your transaction failed to execute.",
            variant: "destructive",
          })
        }
      } catch (error) {
        console.error("Error checking transaction:", error)
        setStatus("failed")
        toast({
          title: "Error Checking Transaction",
          description: "Could not verify transaction status.",
          variant: "destructive",
        })
      }
    }

    checkTransaction()
  }, [txHash, onConfirmed, toast])

  if (!txHash || !status) return null

  return (
    <Alert variant={status === "failed" ? "destructive" : "default"} className="mt-4">
      <AlertDescription className="flex items-center justify-between">
        <div className="flex items-center">
          {status === "pending" && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
          {status === "pending" && "Transaction pending..."}
          {status === "confirmed" && "Transaction confirmed!"}
          {status === "failed" && "Transaction failed."}
        </div>

        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              window.open(`https://basescan.org/tx/${txHash}`, "_blank")
            }}
          >
            View
          </Button>
          <Button variant="ghost" size="sm" onClick={resetTxHash}>
            Dismiss
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  )
}
