"use client"

import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { OnboardingStep } from "@/components/OnboardingStep"
import { Input } from "@/components/ui/input"
import { useAppStore } from "@/store/useAppStore"

type FormValues = {
  name: string
  age: number
}

export default function MotherStep1() {
  const router = useRouter()
  const { pregnancyData, updatePregnancyData } = useAppStore()
  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      name: pregnancyData.name,
      age: pregnancyData.age
    }
  })

  const onSubmit = (data: FormValues) => {
    updatePregnancyData({ name: data.name, age: data.age })
    router.push("/onboarding/mother/step-2")
  }

  return (
    <OnboardingStep 
      title="About you" 
      subtitle="Tell us your name and age."
      formId="step1-form"
    >
      <form id="step1-form" onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Input placeholder="Full name" {...register("name")} className="h-14 text-lg px-4 rounded-xl bg-white border-slate-200" />
        <Input type="number" placeholder="Age" {...register("age", { valueAsNumber: true })} className="h-14 text-lg px-4 rounded-xl bg-white border-slate-200" />
      </form>
    </OnboardingStep>
  )
}
