"use client"

import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { OnboardingStep } from "@/components/OnboardingStep"
import { Input } from "@/components/ui/input"

type FormValues = {
  inviteCode: string
  relationship: string
}

export default function SupportStep2() {
  const router = useRouter()
  const { register, handleSubmit } = useForm<FormValues>()

  const onSubmit = () => {
    router.push("/onboarding/support/step-3")
  }

  return (
    <OnboardingStep
      title="Connect to mother"
      subtitle="Enter invite code and relationship."
      formId="support-step2-form"
      onBack={() => router.back()}
    >
      <form id="support-step2-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input placeholder="Invite code" {...register("inviteCode")} className="h-12 text-base" />
        <Input placeholder="Relationship (partner, parent)" {...register("relationship")} className="h-12 text-base" />
      </form>
    </OnboardingStep>
  )
}
