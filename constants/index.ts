// Contract address from environment variable
export const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "0x39cDac5c800570280031111D5517F02292c4b953"

// World ID app ID from environment variable
export const WORLD_ID_APP_ID = process.env.NEXT_PUBLIC_WORLD_ID_APP_ID

// Contract ABI
export const CONTRACT_ABI = [
  // Mood setting function
  {
    inputs: [
      {
        internalType: "string",
        name: "_mood",
        type: "string",
      },
    ],
    name: "setMood",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  // Get current mood function
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
    name: "getCurrentMood",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  // Get mood history function
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
    name: "getMoodHistory",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "mood",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "timestamp",
            type: "uint256",
          },
        ],
        internalType: "struct MoodContract.MoodData[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  // Get all users function
  {
    inputs: [],
    name: "getAllUsers",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  // Get all latest moods function
  {
    inputs: [],
    name: "getAllLatestMoods",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
      {
        internalType: "string[]",
        name: "",
        type: "string[]",
      },
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  // World ID verification function
  {
    inputs: [
      {
        internalType: "uint256",
        name: "root",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "nullifierHash",
        type: "uint256",
      },
      {
        internalType: "uint256[8]",
        name: "proof",
        type: "uint256[8]",
      },
      {
        internalType: "address",
        name: "signal",
        type: "address",
      },
    ],
    name: "verifyUser",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  // Check verification status function
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
    name: "checkVerification",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  // Events
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "mood",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "MoodSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "UserVerified",
    type: "event",
  },
]
