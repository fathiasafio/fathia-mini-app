// Example test script component

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TestScript() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>MoodChain Testing Script</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <h3 className="font-medium">1. Authentication Flow</h3>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Create a new account with email and password</li>
            <li>Sign out and sign back in with the same credentials</li>
            <li>Test password reset functionality (if implemented)</li>
            <li>Check for proper validation messages on form fields</li>
          </ol>
        </div>

        <div className="space-y-2">
          <h3 className="font-medium">2. Wallet Connection</h3>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Connect MetaMask wallet on mobile and desktop</li>
            <li>Test network detection (Base Mainnet/Goerli)</li>
            <li>Verify wallet address displays correctly</li>
            <li>Test wallet disconnection functionality</li>
          </ol>
        </div>

        <div className="space-y-2">
          <h3 className="font-medium">3. World ID Verification</h3>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Initiate World ID verification process</li>
            <li>Complete verification and check status update</li>
            <li>Verify that contract records verification status</li>
            <li>Test verification badge display</li>
          </ol>
        </div>

        <div className="space-y-2">
          <h3 className="font-medium">4. Mood Setting</h3>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Select different moods from the grid</li>
            <li>Submit a mood and sign the transaction</li>
            <li>Verify transaction status updates</li>
            <li>Check that mood updates after confirmation</li>
          </ol>
        </div>

        <div className="space-y-2">
          <h3 className="font-medium">5. History and Global Views</h3>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Navigate to History tab and verify mood history</li>
            <li>Check Global tab for other users' moods</li>
            <li>Test tab navigation on small screens</li>
            <li>Verify timestamps and formatting</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  )
}
