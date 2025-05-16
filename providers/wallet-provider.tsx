"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { ethers } from "ethers"
import { useToast } from "@/components/ui/use-toast"

interface WalletContextType {
  address: string | null
  isConnected: boolean
  isConnecting: boolean
  connectWallet: () => Promise<string | null>
  disconnectWallet: () => void
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [address, setAddress] = useState<string | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    // Check if wallet was previously connected
    const checkConnection = async () => {
      if (typeof window !== "undefined" && window.ethereum) {
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum as any)
          const accounts = await provider.listAccounts()

          if (accounts.length > 0) {
            setAddress(accounts[0])
            setIsConnected(true)
          }
        } catch (error) {
          console.error("Failed to check wallet connection:", error)
        }
      }
    }

    checkConnection()

    // Listen for account changes
    if (typeof window !== "undefined" && window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        if (accounts.length > 0) {
          setAddress(accounts[0])
          setIsConnected(true)
          toast({
            title: "Wallet Changed",
            description: `Connected to ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`,
          })
        } else {
          setAddress(null)
          setIsConnected(false)
          toast({
            title: "Wallet Disconnected",
            description: "Your wallet has been disconnected.",
            variant: "destructive",
          })
        }
      })

      window.ethereum.on("chainChanged", () => {
        window.location.reload()
      })
    }

    return () => {
      if (typeof window !== "undefined" && window.ethereum) {
        window.ethereum.removeAllListeners("accountsChanged")
        window.ethereum.removeAllListeners("chainChanged")
      }
    }
  }, [toast])

  const connectWallet = async () => {
    if (typeof window === "undefined" || !window.ethereum) {
      toast({
        title: "Wallet Not Found",
        description: "Please install MetaMask or another Ethereum wallet.",
        variant: "destructive",
      })
      return null
    }

    setIsConnecting(true)
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum as any)
      const accounts = await provider.send("eth_requestAccounts", [])

      // Check if connected to Base network
      const network = await provider.getNetwork()
      const baseChainIds = [8453, 84531] // Base Mainnet and Goerli

      if (!baseChainIds.includes(network.chainId)) {
        toast({
          title: "Wrong Network",
          description: "Please connect to Base Mainnet or Base Goerli.",
          variant: "destructive",
        })

        // Try to switch to Base
        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x2105" }], // Base Mainnet
          })
        } catch (switchError: any) {
          // This error code indicates that the chain has not been added to MetaMask
          if (switchError.code === 4902) {
            try {
              await window.ethereum.request({
                method: "wallet_addEthereumChain",
                params: [
                  {
                    chainId: "0x2105",
                    chainName: "Base Mainnet",
                    nativeCurrency: {
                      name: "ETH",
                      symbol: "ETH",
                      decimals: 18,
                    },
                    rpcUrls: ["https://mainnet.base.org"],
                    blockExplorerUrls: ["https://basescan.org"],
                  },
                ],
              })
            } catch (addError) {
              console.error("Failed to add Base network:", addError)
            }
          }
        }
      }

      if (accounts.length > 0) {
        setAddress(accounts[0])
        setIsConnected(true)
        toast({
          title: "Wallet Connected",
          description: `Connected to ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`,
        })
        return accounts[0]
      }
      return null
    } catch (error) {
      console.error("Failed to connect wallet:", error)
      toast({
        title: "Connection Failed",
        description: "Failed to connect wallet. Please try again.",
        variant: "destructive",
      })
      return null
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnectWallet = () => {
    setAddress(null)
    setIsConnected(false)
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected.",
    })
  }

  return (
    <WalletContext.Provider
      value={{
        address,
        isConnected,
        isConnecting,
        connectWallet,
        disconnectWallet,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet() {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider")
  }
  return context
}
