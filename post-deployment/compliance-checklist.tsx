"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export default function ComplianceChecklist() {
  const [checks, setChecks] = useState({
    // Privacy
    privacyPolicy: false,
    termsOfService: false,
    cookieConsent: false,
    dataProtection: false,

    // Blockchain Compliance
    amlPolicy: false,
    kycConsideration: false,
    regulatoryMonitoring: false,

    // Accessibility
    wcagCompliance: false,
    screenReaderTesting: false,
    keyboardNavigation: false,

    // Legal
    disclaimers: false,
    intellectualProperty: false,
    liabilityLimitations: false,
  })

  const updateCheck = (key: string) => {
    setChecks({
      ...checks,
      [key]: !checks[key as keyof typeof checks],
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Compliance & Legal Checklist</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Privacy & Data Protection */}
        <div className="space-y-2">
          <h3 className="font-medium">Privacy & Data Protection</h3>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="privacyPolicy"
                checked={checks.privacyPolicy}
                onCheckedChange={() => updateCheck("privacyPolicy")}
              />
              <Label htmlFor="privacyPolicy">Privacy policy is published and accessible</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="termsOfService"
                checked={checks.termsOfService}
                onCheckedChange={() => updateCheck("termsOfService")}
              />
              <Label htmlFor="termsOfService">Terms of service are published</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="cookieConsent"
                checked={checks.cookieConsent}
                onCheckedChange={() => updateCheck("cookieConsent")}
              />
              <Label htmlFor="cookieConsent">Cookie consent mechanism implemented</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="dataProtection"
                checked={checks.dataProtection}
                onCheckedChange={() => updateCheck("dataProtection")}
              />
              <Label htmlFor="dataProtection">Data protection measures documented</Label>
            </div>
          </div>
        </div>

        {/* Blockchain Compliance */}
        <div className="space-y-2">
          <h3 className="font-medium">Blockchain Compliance</h3>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Checkbox id="amlPolicy" checked={checks.amlPolicy} onCheckedChange={() => updateCheck("amlPolicy")} />
              <Label htmlFor="amlPolicy">AML policy considerations (if applicable)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="kycConsideration"
                checked={checks.kycConsideration}
                onCheckedChange={() => updateCheck("kycConsideration")}
              />
              <Label htmlFor="kycConsideration">KYC requirements evaluated</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="regulatoryMonitoring"
                checked={checks.regulatoryMonitoring}
                onCheckedChange={() => updateCheck("regulatoryMonitoring")}
              />
              <Label htmlFor="regulatoryMonitoring">System for monitoring regulatory changes</Label>
            </div>
          </div>
        </div>

        {/* Accessibility */}
        <div className="space-y-2">
          <h3 className="font-medium">Accessibility</h3>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="wcagCompliance"
                checked={checks.wcagCompliance}
                onCheckedChange={() => updateCheck("wcagCompliance")}
              />
              <Label htmlFor="wcagCompliance">WCAG compliance checked</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="screenReaderTesting"
                checked={checks.screenReaderTesting}
                onCheckedChange={() => updateCheck("screenReaderTesting")}
              />
              <Label htmlFor="screenReaderTesting">Screen reader testing completed</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="keyboardNavigation"
                checked={checks.keyboardNavigation}
                onCheckedChange={() => updateCheck("keyboardNavigation")}
              />
              <Label htmlFor="keyboardNavigation">Keyboard navigation tested</Label>
            </div>
          </div>
        </div>

        {/* Legal Protections */}
        <div className="space-y-2">
          <h3 className="font-medium">Legal Protections</h3>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="disclaimers"
                checked={checks.disclaimers}
                onCheckedChange={() => updateCheck("disclaimers")}
              />
              <Label htmlFor="disclaimers">Appropriate disclaimers in place</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="intellectualProperty"
                checked={checks.intellectualProperty}
                onCheckedChange={() => updateCheck("intellectualProperty")}
              />
              <Label htmlFor="intellectualProperty">Intellectual property protections</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="liabilityLimitations"
                checked={checks.liabilityLimitations}
                onCheckedChange={() => updateCheck("liabilityLimitations")}
              />
              <Label htmlFor="liabilityLimitations">Liability limitations documented</Label>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
