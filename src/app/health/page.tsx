"use client"

import { Card } from "@/components/Card"
import { useAppStore } from "@/store/useAppStore"
import { LineChart, Line, ResponsiveContainer, Tooltip } from "recharts"
import { HeartPulse, Footprints, Wind, Activity, ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function HealthPage() {
  const healthData = useAppStore((state) => state.healthData)
  const router = useRouter()

  const iconMap = {
    "Blood Pressure": Activity,
    Steps: Footprints,
    "Heart Rate": HeartPulse,
    Oxygen: Wind
  } as const

  return (
    <div className="space-y-6 fade-slide">
      <div className="flex items-center gap-2 mb-4">
        <button onClick={() => router.back()} className="pressable p-2 bg-white rounded-full shadow-soft">
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-xl font-bold text-text">Health</h1>
      </div>

      <img src="/images/health-dashboard.png" alt="Health Dashboard" className="w-full rounded-xl object-cover mb-4" />

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
                <div className="relative flex h-14 w-14 items-center justify-center">
                  <svg className="absolute inset-0 h-full w-full -rotate-90 transform">
                    <circle cx="28" cy="28" r="24" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-black/5" />
                    <circle cx="28" cy="28" r="24" stroke="currentColor" strokeWidth="4" fill="transparent" strokeDasharray={2 * Math.PI * 24} strokeDashoffset={(2 * Math.PI * 24) - (progress / 100) * (2 * Math.PI * 24)} strokeLinecap="round" className="text-highlight transition-all duration-1000 ease-out" />
                  </svg>
                  <div className="text-[10px] font-semibold text-text">{progress}%</div>
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
