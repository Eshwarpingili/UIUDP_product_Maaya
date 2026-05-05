"use client"

import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { OnboardingStep } from "@/components/OnboardingStep"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { useAppStore } from "@/store/useAppStore"

type FormValues = {
  invite: string
  shareReports: boolean
  shareAppointments: boolean
}

export default function MotherStep5() {
  const router = useRouter()
  const { pregnancyData, updatePregnancyData } = useAppStore()
  const { register, handleSubmit, watch, setValue } = useForm<FormValues>({
    defaultValues: {
      invite: pregnancyData.supportInvite,
      shareReports: pregnancyData.permissions.includes("Share reports"),
      shareAppointments: pregnancyData.permissions.includes("Share appointments")
    }
  })

  const shareReports = watch("shareReports")
  const shareAppointments = watch("shareAppointments")

  const onSubmit = (data: FormValues) => {
    const permissions = [] as string[]
    if (data.shareReports) permissions.push("Share reports")
    if (data.shareAppointments) permissions.push("Share appointments")
    updatePregnancyData({ supportInvite: data.invite, permissions })
    router.push("/home")
  }

  return (
    <OnboardingStep
      title="Invite support"
      subtitle="Share your progress with a partner or caregiver."
      formId="step5-form"
      onBack={() => router.back()}
      nextLabel="Finish"
    >
      <form id="step5-form" onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Input placeholder="Invite code" {...register("invite")} className="h-14 text-lg px-4 rounded-xl bg-white border-slate-200 mb-8" />
        <div className="flex items-center justify-between rounded-2xl bg-white p-5 shadow-sm border border-slate-100">
          <div>
            <div className="text-lg font-medium text-slate-900">Share reports</div>
            <div className="text-sm text-slate-500 mt-1">Allow support to view reports.</div>
          </div>
          <Switch
            checked={shareReports}
            onCheckedChange={(value) => setValue("shareReports", value)}
            className="scale-110"
          />
        </div>
        <div className="flex items-center justify-between rounded-2xl bg-white p-5 shadow-sm border border-slate-100">
          <div>
            <div className="text-lg font-medium text-slate-900">Share appointments</div>
            <div className="text-sm text-slate-500 mt-1">Allow support to view appointments.</div>
          </div>
          <Switch
            checked={shareAppointments}
            onCheckedChange={(value) => setValue("shareAppointments", value)}
            className="scale-110"
          />
        </div>
      </form>
    </OnboardingStep>
  )
}
