"use client"

import { useRouter } from "next/navigation"
import { Card } from "@/components/Card"
import { Dropdown } from "@/components/Dropdown"
import { Button } from "@/components/ui/button"
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
    <Card title="Pregnancy type" subtitle="Choose the best description.">
      <div className="space-y-4">
        <Dropdown
          options={options}
          value={pregnancyData.pregnancyType}
          onChange={(value) => updatePregnancyData({ pregnancyType: value })}
        />
        <div className="flex justify-between">
          <Button variant="ghost" onClick={() => router.back()}>
            Back
          </Button>
          <Button onClick={() => router.push("/onboarding/mother/step-4")}>
            Next
          </Button>
        </div>
      </div>
    </Card>
  )
}
