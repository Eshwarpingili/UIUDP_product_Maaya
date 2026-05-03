"use client"

import { Card } from "@/components/Card"
import { useAppStore } from "@/store/useAppStore"
import { LineChart, Line, ResponsiveContainer, Tooltip } from "recharts"
import { HeartPulse, Footprints, Wind, Activity } from "lucide-react"

export default function HealthPage() {
  const healthData = useAppStore((state) => state.healthData)

  const iconMap = {
    "Blood Pressure": Activity,
    Steps: Footprints,
    "Heart Rate": HeartPulse,
    Oxygen: Wind
  } as const

  return (
    <div className="space-y-6 fade-slide">
      <Card title="AI health summary" subtitle="Personalized insight">
        <p className="text-sm text-black/70">
          Overall vitals are stable. Activity is improving, and heart rate is steady. Keep up hydration and
          balance rest with movement.
        </p>
      </Card>
      <div className="grid gap-4">
        {healthData.map((metric) => {
          const Icon = iconMap[metric.label as keyof typeof iconMap] ?? Activity
          const progress = Math.min(
            100,
            Math.round((metric.value / (metric.label === "Steps" ? 10000 : 120)) * 100)
          )
          return (
            <Card key={metric.id}>
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-text">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-black/5">
                      <Icon size={18} />
                    </span>
                    {metric.label}
                  </div>
                  <div className="text-xs text-black/60">
                    {metric.value} {metric.unit}
                  </div>
                </div>
                <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-highlight/30">
                  <div className="text-sm font-semibold text-highlight">{progress}%</div>
                </div>
              </div>
              <div className="mt-3 h-24">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={metric.data}>
                    <Line type="monotone" dataKey="value" stroke="#a78bfa" strokeWidth={2} dot={false} />
                    <Tooltip />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
