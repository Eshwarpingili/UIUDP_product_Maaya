"use client"

import Link from "next/link"
import { differenceInDays, format, parseISO } from "date-fns"
import { Card } from "@/components/Card"
import { Button } from "@/components/ui/button"
import { useAppStore } from "@/store/useAppStore"
import { AlertCard } from "@/components/AlertCard"
import { AppointmentCard } from "@/components/AppointmentCard"
import { BabyGrowthIllustration } from "@/components/Illustrations"

export default function HomePage() {
  const { userRole, pregnancyData, alerts, appointments } = useAppStore()

  if (userRole === "support") {
    return (
      <div className="space-y-6 fade-slide">
        <Card title="Mother status" subtitle="Read-only overview for support.">
          <div className="text-sm text-black/70">
            {pregnancyData.name} is {pregnancyData.age} years old. Due date is
            {" "}{format(parseISO(pregnancyData.dueDate), "dd MMM yyyy")}.
          </div>
          <div className="mt-3 text-xs text-black/50">
            Conditions: {pregnancyData.conditions.join(", ")}
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
        <div>
          <div className="section-title">Appointments</div>
          <div className="mt-3 grid gap-3">
            {appointments.map((appointment) => (
              <AppointmentCard key={appointment.id} {...appointment} />
            ))}
          </div>
        </div>
      </div>
    )
  }

  const daysRemaining = differenceInDays(parseISO(pregnancyData.dueDate), new Date())
  const trimester = daysRemaining > 180 ? "First" : daysRemaining > 90 ? "Second" : "Third"

  const progress = Math.min(100, Math.max(0, Math.round(((280 - daysRemaining) / 280) * 100)))

  return (
    <div className="space-y-6 fade-slide">
      <div className="relative overflow-hidden rounded-2xl bg-white p-5 shadow-card">
        <div className="absolute app-blob one" />
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <div className="text-sm text-black/60">Welcome back</div>
            <div className="text-xl font-semibold">{pregnancyData.name}</div>
            <div className="mt-2 text-xs text-black/60">{trimester} trimester</div>
          </div>
          <BabyGrowthIllustration />
        </div>
        <div className="relative z-10 mt-4">
          <div className="flex items-center justify-between text-xs text-black/60">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="mt-2 h-2 w-full rounded-full bg-black/5">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-highlight to-accent-200"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-3 flex gap-3 text-xs">
            <div className="rounded-xl bg-white/80 px-3 py-2 shadow-soft">
              <div className="text-black/60">Days remaining</div>
              <div className="text-base font-semibold">{daysRemaining}</div>
            </div>
            <div className="rounded-xl bg-white/80 px-3 py-2 shadow-soft">
              <div className="text-black/60">Due date</div>
              <div className="text-base font-semibold">
                {format(parseISO(pregnancyData.dueDate), "dd MMM")}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Card title="Quick actions" subtitle="Jump to key tasks.">
        <div className="flex flex-wrap gap-3">
          <Link href="/body">
            <Button variant="secondary">Body status</Button>
          </Link>
          <Link href="/appointment">
            <Button variant="outline">Book appointment</Button>
          </Link>
          <Link href="/reports/upload">
            <Button>Upload report</Button>
          </Link>
        </div>
      </Card>
      <Card
        title="What is happening with your body"
        subtitle="AI summary based on recent reports."
        className="card-highlight"
      >
        <p className="text-sm text-black/70">
          Your energy levels are stable and hydration needs a small boost. Baby growth is on track and your
          blood pressure remains steady. Continue light movement and rest.
        </p>
      </Card>
    </div>
  )
}
