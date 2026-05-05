"use client"

import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { format, parseISO } from "date-fns"
import { OnboardingStep } from "@/components/OnboardingStep"
import { Input } from "@/components/ui/input"
import { useAppStore } from "@/store/useAppStore"

type FormValues = {
  dueDate: string
}

export default function MotherStep2() {
  const router = useRouter()
  const { pregnancyData, updatePregnancyData } = useAppStore()
  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      dueDate: format(parseISO(pregnancyData.dueDate), "yyyy-MM-dd")
    }
  })

  const onSubmit = (data: FormValues) => {
    updatePregnancyData({ dueDate: new Date(data.dueDate).toISOString() })
    router.push("/onboarding/mother/step-3")
  }

  return (
    <OnboardingStep
      title="Due date"
      subtitle="When is your expected due date?"
      formId="step2-form"
      onBack={() => router.back()}
    >
      <form id="step2-form" onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Input type="date" {...register("dueDate")} className="h-14 text-lg px-4 rounded-xl bg-white border-slate-200" />
      </form>
    </OnboardingStep>
  )
}
