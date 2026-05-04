"use client"

import { useRouter } from "next/navigation"
import { Card } from "@/components/Card"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function SupportStep3() {
  const router = useRouter()
  const [criticalAlerts, setCriticalAlerts] = useState(true)
  const [lifestyleAlerts, setLifestyleAlerts] = useState(true)
  const [appointments, setAppointments] = useState(true)
  const [sosAlerts, setSosAlerts] = useState(true)

  return (
    <Card title="Notifications" subtitle="Choose what you want to receive.">
      <div className="space-y-4">
        <div className="flex items-center justify-between rounded-xl bg-black/5 p-3">
          <div>
            <div className="text-sm font-medium">Critical Alerts</div>
            <div className="text-xs text-black/60">Be notified on urgent issues.</div>
          </div>
          <Switch checked={criticalAlerts} onCheckedChange={setCriticalAlerts} />
        </div>
        <div className="flex items-center justify-between rounded-xl bg-black/5 p-3">
          <div>
            <div className="text-sm font-medium">Lifestyle Alerts</div>
            <div className="text-xs text-black/60">Updates on hydration, sleep, etc.</div>
          </div>
          <Switch checked={lifestyleAlerts} onCheckedChange={setLifestyleAlerts} />
        </div>
        <div className="flex items-center justify-between rounded-xl bg-black/5 p-3">
          <div>
            <div className="text-sm font-medium">Appointments</div>
            <div className="text-xs text-black/60">Reminders for doctor visits.</div>
          </div>
          <Switch checked={appointments} onCheckedChange={setAppointments} />
        </div>
        <div className="flex items-center justify-between rounded-xl bg-black/5 p-3">
          <div>
            <div className="text-sm font-medium">SOS Alerts</div>
            <div className="text-xs text-black/60">Immediate emergency notifications.</div>
          </div>
          <Switch checked={sosAlerts} onCheckedChange={setSosAlerts} />
        </div>
        <div className="flex justify-between pt-2">
          <Button variant="ghost" onClick={() => router.back()}>
            Back
          </Button>
          <Button onClick={() => router.push("/home")}>Finish</Button>
        </div>
      </div>
    </Card>
  )
}
