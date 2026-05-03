"use client"

import { useRouter } from "next/navigation"
import { Card } from "@/components/Card"
import { Button } from "@/components/ui/button"
import { useAppStore } from "@/store/useAppStore"

export default function RolePage() {
  const router = useRouter()
  const setRole = useAppStore((state) => state.setUserRole)

  return (
    <div className="space-y-6 fade-slide">
      <img src="/images/onboarding.png" alt="Onboarding" className="w-full rounded-xl object-cover mb-4" />
      <div>
        <h2 className="text-xl font-semibold">Select your role</h2>
        <p className="text-sm text-black/60">
          We will tailor the experience to your needs.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card
          title="I am the mother"
          subtitle="Track your health, reports, and milestones."
        >
          <Button
            onClick={() => {
              setRole("mother")
              router.push("/onboarding/mother/step-1")
            }}
          >
            Continue
          </Button>
        </Card>
        <Card
          title="I am support"
          subtitle="Stay informed and help with reminders and care."
        >
          <Button
            variant="secondary"
            onClick={() => {
              setRole("support")
              router.push("/onboarding/support/step-1")
            }}
          >
            Continue
          </Button>
        </Card>
      </div>
    </div>
  )
}
