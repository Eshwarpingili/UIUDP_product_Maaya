"use client"

import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { Card } from "@/components/Card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
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
    <Card title="Invite support" subtitle="Share your progress with a partner or caregiver.">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input placeholder="Invite code" {...register("invite")} />
        <div className="flex items-center justify-between rounded-xl bg-black/5 p-3">
          <div>
            <div className="text-sm font-medium">Share reports</div>
            <div className="text-xs text-black/60">Allow support to view reports.</div>
          </div>
          <Switch
            checked={shareReports}
            onCheckedChange={(value) => setValue("shareReports", value)}
          />
        </div>
        <div className="flex items-center justify-between rounded-xl bg-black/5 p-3">
          <div>
            <div className="text-sm font-medium">Share appointments</div>
            <div className="text-xs text-black/60">Allow support to view appointments.</div>
          </div>
          <Switch
            checked={shareAppointments}
            onCheckedChange={(value) => setValue("shareAppointments", value)}
          />
        </div>
        <div className="flex justify-between">
          <Button variant="ghost" type="button" onClick={() => router.back()}>
            Back
          </Button>
          <Button type="submit">Finish</Button>
        </div>
      </form>
    </Card>
  )
}
