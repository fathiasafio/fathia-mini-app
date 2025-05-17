// Example analytics implementation for MoodBase

// 1. Install analytics packages
// npm install @vercel/analytics plausible-tracker

// 2. Add to your layout.tsx
import { Analytics } from "@vercel/analytics/react"

// Inside your RootLayout component
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
// 3. Custom event tracking example
;("use client")

import type React from "react"
import Plausible from "plausible-tracker"

// Initialize Plausible
const plausible = Plausible({
  domain: "moodbase.app", // Replace with your domain
  trackLocalhost: true,
})

export function MoodEventTracker() {
  const { trackEvent } = plausible()

  // Track custom events
  const trackMoodSet = (mood: string) => {
    trackEvent("mood_set", { props: { mood } })
  }

  const trackVerification = () => {
    trackEvent("world_id_verified")
  }

  const trackWalletConnected = (walletType: string) => {
    trackEvent("wallet_connected", { props: { wallet: walletType } })
  }

  return {
    trackMoodSet,
    trackVerification,
    trackWalletConnected,
  }
}

// 4. Error monitoring with Sentry
// npm install @sentry/nextjs

// In sentry.client.config.js
import * as Sentry from "@sentry/nextjs"

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  tracesSampleRate: 1.0,
})
