"use client"

import { useAppStore } from "@/store/useAppStore"
import { Card } from "@/components/Card"
import { AlertCard } from "@/components/AlertCard"
import { useRouter } from "next/navigation"
import { ChevronLeft } from "lucide-react"

export default function BodyPage() {
  const alerts = useAppStore((state) => state.alerts)
  const router = useRouter()

  return (
    <div className="space-y-6 fade-slide">
      <div className="flex items-center gap-2 mb-4">
        <button onClick={() => router.back()} className="pressable p-2 bg-white rounded-full shadow-soft">
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-xl font-bold text-text">Body Status</h1>
      </div>

      <Card title="AI body summary" subtitle="Based on your recent check-ins.">
        <div className="flex items-center justify-between">
          <p className="text-sm text-black/70">
            Muscle tension is mild and sleep quality is moderate. Hydration and iron intake should be
            prioritized this week. Continue gentle movement to improve circulation.
          </p>
        </div>
      </Card>
      
      <div>
        <div className="section-title mb-3">Key Changes</div>
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Card className="flex flex-col items-center justify-center p-4 text-center">
            <img src="/images/body-brain.png" alt="Brain" className="w-12 h-12 object-cover mb-2" />
            <span className="text-sm font-semibold">Mental State</span>
          </Card>
          <Card className="flex flex-col items-center justify-center p-4 text-center">
            <img src="/images/body-heart.png" alt="Heart" className="w-12 h-12 object-cover mb-2" />
            <span className="text-sm font-semibold">Heart Rate</span>
          </Card>
          <Card className="flex flex-col items-center justify-center p-4 text-center">
            <img src="/images/body-water.png" alt="Water" className="w-12 h-12 object-cover mb-2" />
            <span className="text-sm font-semibold">Hydration</span>
          </Card>
          <Card className="flex flex-col items-center justify-center p-4 text-center">
            <img src="/images/body-foot.png" alt="Foot" className="w-12 h-12 object-cover mb-2" />
            <span className="text-sm font-semibold">Swelling</span>
          </Card>
          <Card className="flex flex-col items-center justify-center p-4 text-center">
            <img src="/images/body-pulse.png" alt="Pulse" className="w-12 h-12 object-cover mb-2" />
            <span className="text-sm font-semibold">Pulse</span>
          </Card>
        </div>
      </div>

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
