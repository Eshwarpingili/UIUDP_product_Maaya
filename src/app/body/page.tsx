"use client"

import { useAppStore } from "@/store/useAppStore"
import { Card } from "@/components/Card"
import { AlertCard } from "@/components/AlertCard"
import { BodyChangeIllustration } from "@/components/Illustrations"

export default function BodyPage() {
  const alerts = useAppStore((state) => state.alerts)

  return (
    <div className="space-y-6 fade-slide">
      <Card title="AI body summary" subtitle="Based on your recent check-ins.">
        <div className="flex items-center justify-between">
          <p className="text-sm text-black/70">
            Muscle tension is mild and sleep quality is moderate. Hydration and iron intake should be
            prioritized this week. Continue gentle movement to improve circulation.
          </p>
          <BodyChangeIllustration className="hidden sm:block" />
        </div>
      </Card>
      <div>
        <div className="section-title">Alerts</div>
        <div className="mt-3 grid gap-3">
          {alerts.map((alert) => (
            <AlertCard key={alert.id} {...alert} />
          ))}
        </div>
      </div>
    </div>
  )
}
