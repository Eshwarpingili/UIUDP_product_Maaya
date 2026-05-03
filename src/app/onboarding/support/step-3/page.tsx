"use client"

import { useRouter } from "next/navigation"
import { Card } from "@/components/Card"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function SupportStep3() {
  const router = useRouter()
  const [updates, setUpdates] = useState(true)
  const [alerts, setAlerts] = useState(true)

  return (
    <Card title="Notifications" subtitle="Choose what you want to receive.">
      <div className="space-y-4">
        <div className="flex items-center justify-between rounded-xl bg-black/5 p-3">
          <div>
            <div className="text-sm font-medium">Weekly updates</div>
            <div className="text-xs text-black/60">Track milestones and tips.</div>
          </div>
          <Switch checked={updates} onCheckedChange={setUpdates} />
        </div>
        <div className="flex items-center justify-between rounded-xl bg-black/5 p-3">
          <div>
            <div className="text-sm font-medium">Critical alerts</div>
            <div className="text-xs text-black/60">Be notified on urgent issues.</div>
          </div>
          <Switch checked={alerts} onCheckedChange={setAlerts} />
        </div>
        <div className="flex justify-between">
          <Button variant="ghost" onClick={() => router.back()}>
            Back
          </Button>
          <Button onClick={() => router.push("/home")}>Finish</Button>
        </div>
      </div>
    </Card>
  )
}
