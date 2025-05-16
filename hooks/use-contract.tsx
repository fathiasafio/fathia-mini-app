"use client"

import { useState, useCallback } from "react"
import { useWallet } from "@/providers/wallet-provider"
import { ethers } from "ethers"
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "@/constants"
import { useToast } from "@/components/ui/use-toast"

interface MoodData {
  mood: string
  timestamp: number
}

interface GlobalMoodData {
  address: string
  mood: string
  timestamp: number
}

interface ContractInterface {
  currentMood: string | null
  isLoadingMood: boolean
  isSettingMood: boolean
  isUserVerified: boolean
  isCheckingVerification: boolean
  lastTransactionHash: string | null
  fetchCurrentMood: () => Promise<void>
  setMood: (mood: string) => Promise<void>
  getMoodHistory: () => Promise<MoodData[]>
  getAllLatestMoods: () => Promise<GlobalMoodData[]>
  checkUserVerification: (address: string) => Promise<void>
  resetTransactionHash: () => void
}

export function useContract(): ContractInterface {
  const { address, isConnected } = useWallet()
  const [currentMood, setCurrentMood] = useState<string | null>(null)
  const [isLoadingMood, setIsLoadingMood] = useState(false)
  const [isSettingMood, setIsSettingMood] = useState(false)
  const [isUserVerified, setIsUserVerified] = useState(false)
  const [isCheckingVerification, setIsCheckingVerification] = useState(false)
  const [lastTransactionHash, setLastTransactionHash] = useState<string | null>(null)
  const { toast } = useToast()

  const resetTransactionHash = useCallback(() => {
    setLastTransactionHash(null)
  }, [])

  // Check if user is verified with World ID
  const checkUserVerification = useCallback(
    async (userAddress: string) => {
      if (!userAddress) return

      setIsCheckingVerification(true)
      try {
        if (typeof window !== "undefined" && window.ethereum) {
          const provider = new ethers.providers.Web3Provider(window.ethereum as any)
          const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider)

          const isVerified = await contract.checkVerification(userAddress)
          setIsUserVerified(isVerified)

          return isVerified
        }
      } catch (error) {
        console.error("Error checking verification status:", error)
        setIsUserVerified(false)
        toast({
          title: "Verification Check Failed",
          description: "Could not check your verification status.",
          variant: "destructive",
        })
      } finally {
        setIsCheckingVerification(false)
      }
    },
    [toast],
  )

  // Fetch current mood
  const fetchCurrentMood = useCallback(async () => {
    if (!isConnected || !address) return

    setIsLoadingMood(true)
    try {
      if (typeof window !== "undefined" && window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum as any)
        const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider)

        const result = await contract.getCurrentMood(address)
        setCurrentMood(result[0])

        return result[0]
      }
    } catch (error) {
      console.error("Error fetching mood:", error)
      setCurrentMood(null)
      toast({
        title: "Failed to Load Mood",
        description: "Could not retrieve your current mood.",
        variant: "destructive",
      })
    } finally {
      setIsLoadingMood(false)
    }
  }, [isConnected, address, toast])

  // Set mood
  const setMood = useCallback(
    async (mood: string) => {
      if (!isConnected || !address) {
        toast({
          title: "Wallet Not Connected",
          description: "Please connect your wallet first.",
          variant: "destructive",
        })
        return
      }

      if (!isUserVerified) {
        toast({
          title: "Verification Required",
          description: "You need to verify with World ID first.",
          variant: "destructive",
        })
        return
      }

      setIsSettingMood(true)
      try {
        if (typeof window !== "undefined" && window.ethereum) {
          const provider = new ethers.providers.Web3Provider(window.ethereum as any)
          const signer = provider.getSigner()
          const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer)

          const tx = await contract.setMood(mood)
          setLastTransactionHash(tx.hash)

          toast({
            title: "Transaction Submitted",
            description: "Your mood is being recorded on the blockchain.",
          })

          // We don't await tx.wait() here anymore since we're using the TransactionStatus component
          // This allows the UI to remain responsive while the transaction is being processed

          // Update the UI immediately for better UX
          setCurrentMood(mood)
        }
      } catch (error) {
        console.error("Error setting mood:", error)
        toast({
          title: "Transaction Failed",
          description: "Failed to set your mood. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsSettingMood(false)
      }
    },
    [isConnected, address, isUserVerified, toast],
  )

  // Get mood history
  const getMoodHistory = useCallback(async (): Promise<MoodData[]> => {
    if (!isConnected || !address) return []

    try {
      if (typeof window !== "undefined" && window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum as any)
        const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider)

        const result = await contract.getMoodHistory(address)
        return result.map((item: any) => ({
          mood: item.mood,
          timestamp: Number(item.timestamp) * 1000,
        }))
      }
    } catch (error) {
      console.error("Error fetching mood history:", error)
      toast({
        title: "Failed to Load History",
        description: "Could not retrieve your mood history.",
        variant: "destructive",
      })
    }

    return []
  }, [isConnected, address, toast])

  // Get all latest moods
  const getAllLatestMoods = useCallback(async (): Promise<GlobalMoodData[]> => {
    if (!isConnected) return []

    try {
      if (typeof window !== "undefined" && window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum as any)
        const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider)

        const result = await contract.getAllLatestMoods()
        const [addresses, moods, timestamps] = result

        return addresses.map((addr: string, i: number) => ({
          address: addr,
          mood: moods[i],
          timestamp: Number(timestamps[i]) * 1000,
        }))
      }
    } catch (error) {
      console.error("Error fetching global moods:", error)
      toast({
        title: "Failed to Load Global Moods",
        description: "Could not retrieve global mood data.",
        variant: "destructive",
      })
    }

    return []
  }, [isConnected, toast])

  return {
    currentMood,
    isLoadingMood,
    isSettingMood,
    isUserVerified,
    isCheckingVerification,
    lastTransactionHash,
    fetchCurrentMood,
    setMood,
    getMoodHistory,
    getAllLatestMoods,
    checkUserVerification,
    resetTransactionHash,
  }
}
