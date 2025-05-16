"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { useWallet } from "@/providers/wallet-provider"

export function NetworkIndicator() {
  const { isConnected } = useWallet()
  const [networkName, setNetworkName] = useState<string | null>(null)
  const [isTestnet, setIsTestnet] = useState(false)

  useEffect(() => {
    const checkNetwork = async () => {
      if (typeof window !== "undefined" && window.ethereum && isConnected) {
        try {
          const chainId = await window.ethereum.request({ method: "eth_chainId" })

          // Convert chainId to number
          const chainIdNum = Number.parseInt(chainId, 16)

          // Set network name based on chainId
          switch (chainIdNum) {
            case 8453:
              setNetworkName("Base")
              setIsTestnet(false)
              break
            case 84531:
              setNetworkName("Base Goerli")
              setIsTestnet(true)
              break
            default:
              setNetworkName("Unknown Network")
              setIsTestnet(false)
          }
        } catch (error) {
          console.error("Error checking network:", error)
          setNetworkName(null)
        }
      } else {
        setNetworkName(null)
      }
    }

    checkNetwork()

    // Listen for chain changes
    if (typeof window !== "undefined" && window.ethereum) {
      window.ethereum.on("chainChanged", checkNetwork)
      return () => {
        window.ethereum.removeListener("chainChanged", checkNetwork)
      }
    }
  }, [isConnected])

  if (!networkName) return null

  return (
    <Badge variant={isTestnet ? "outline" : "default"} className={isTestnet ? "border-yellow-500 text-yellow-500" : ""}>
      {networkName}
      {isTestnet && " (Testnet)"}
    </Badge>
  )
}
