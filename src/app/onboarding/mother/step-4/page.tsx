"use client"

import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { Card } from "@/components/Card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useAppStore } from "@/store/useAppStore"

type FormValues = {
  conditions: string
  lifestyle: string
}

export default function MotherStep4() {
  const router = useRouter()
  const { pregnancyData, updatePregnancyData } = useAppStore()
  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      conditions: pregnancyData.conditions.join(", "),
      lifestyle: pregnancyData.lifestyle
    }
  })

  const onSubmit = (data: FormValues) => {
    updatePregnancyData({
      conditions: data.conditions.split(",").map((item) => item.trim()),
      lifestyle: data.lifestyle
    })
    router.push("/onboarding/mother/step-5")
  }

  return (
    <Card title="Health & lifestyle" subtitle="Add conditions and lifestyle habits.">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Textarea placeholder="Conditions (comma separated)" {...register("conditions")} />
        <Textarea placeholder="Lifestyle (eg. yoga, walking)" {...register("lifestyle")} />
        <div className="flex justify-between">
          <Button variant="ghost" type="button" onClick={() => router.back()}>
            Back
          </Button>
          <Button type="submit">Next</Button>
        </div>
      </form>
    </Card>
  )
}
