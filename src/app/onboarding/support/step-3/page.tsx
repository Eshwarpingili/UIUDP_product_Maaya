"use client"

import { useRouter } from "next/navigation"
import { OnboardingStep } from "@/components/OnboardingStep"
import { Switch } from "@/components/ui/switch"
import { useState } from "react"

export default function SupportStep3() {
  const router = useRouter()
  const [criticalAlerts, setCriticalAlerts] = useState(true)
  const [lifestyleAlerts, setLifestyleAlerts] = useState(true)
  const [appointments, setAppointments] = useState(true)
  const [sosAlerts, setSosAlerts] = useState(true)

  return (
    <OnboardingStep
      title="Notifications"
      subtitle="Choose what you want to receive."
      onBack={() => router.back()}
      onNext={() => router.push("/home")}
      isNextSubmit={false}
      nextLabel="Finish"
    >
      <div className="space-y-5">
        <div className="flex items-center justify-between rounded-2xl bg-white p-5 shadow-sm border border-slate-100">
          <div>
            <div className="text-lg font-medium text-slate-900">Critical Alerts</div>
            <div className="text-sm text-slate-500 mt-1">Be notified on urgent issues.</div>
          </div>
          <Switch checked={criticalAlerts} onCheckedChange={setCriticalAlerts} className="scale-110" />
        </div>
        <div className="flex items-center justify-between rounded-2xl bg-white p-5 shadow-sm border border-slate-100">
          <div>
            <div className="text-lg font-medium text-slate-900">Lifestyle Alerts</div>
            <div className="text-sm text-slate-500 mt-1">Updates on hydration, sleep, etc.</div>
          </div>
          <Switch checked={lifestyleAlerts} onCheckedChange={setLifestyleAlerts} className="scale-110" />
        </div>
        <div className="flex items-center justify-between rounded-2xl bg-white p-5 shadow-sm border border-slate-100">
          <div>
            <div className="text-lg font-medium text-slate-900">Appointments</div>
            <div className="text-sm text-slate-500 mt-1">Reminders for doctor visits.</div>
          </div>
          <Switch checked={appointments} onCheckedChange={setAppointments} className="scale-110" />
        </div>
        <div className="flex items-center justify-between rounded-2xl bg-white p-5 shadow-sm border border-slate-100">
          <div>
            <div className="text-lg font-medium text-slate-900">SOS Alerts</div>
            <div className="text-sm text-slate-500 mt-1">Immediate emergency notifications.</div>
          </div>
          <Switch checked={sosAlerts} onCheckedChange={setSosAlerts} className="scale-110" />
        </div>
      </div>
    </OnboardingStep>
  )
}
