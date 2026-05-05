"use client"

import { useRouter } from "next/navigation"
import { OnboardingStep } from "@/components/OnboardingStep"
import { Dropdown } from "@/components/Dropdown"
import { useAppStore } from "@/store/useAppStore"

const options = [
  { label: "Singleton", value: "Singleton" },
  { label: "Twins", value: "Twins" },
  { label: "High-risk", value: "High-risk" }
]

export default function MotherStep3() {
  const router = useRouter()
  const { pregnancyData, updatePregnancyData } = useAppStore()

  return (
    <OnboardingStep
      title="Pregnancy type"
      subtitle="Choose the best description."
      onBack={() => router.back()}
      onNext={() => router.push("/onboarding/mother/step-4")}
      isNextSubmit={false}
    >
      <div className="space-y-4">
        <Dropdown
          options={options}
          value={pregnancyData.pregnancyType}
          onChange={(value) => updatePregnancyData({ pregnancyType: value })}
        />
      </div>
    </OnboardingStep>
  )
}
