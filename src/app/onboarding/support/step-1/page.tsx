"use client"

import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { OnboardingStep } from "@/components/OnboardingStep"
import { Input } from "@/components/ui/input"

type FormValues = {
  name: string
  email: string
}

export default function SupportStep1() {
  const router = useRouter()
  const { register, handleSubmit } = useForm<FormValues>()

  const onSubmit = () => {
    router.push("/onboarding/support/step-2")
  }

  return (
    <OnboardingStep
      title="Support account"
      subtitle="Create your support profile."
      formId="support-step1-form"
    >
      <form id="support-step1-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input placeholder="Full name" {...register("name")} className="h-12 text-base" />
        <Input type="email" placeholder="Email" {...register("email")} className="h-12 text-base" />
      </form>
    </OnboardingStep>
  )
}
