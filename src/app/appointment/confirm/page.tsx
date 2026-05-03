"use client"

import { useSearchParams } from "next/navigation"
import { format, parseISO } from "date-fns"
import { Card } from "@/components/Card"
import { Button } from "@/components/ui/button"
import { Suspense } from "react"

function QRPlaceholder() {
  return (
    <div className="grid h-40 w-40 place-items-center rounded-2xl border border-black/10 bg-white">
      <div className="grid h-28 w-28 grid-cols-6 gap-1">
        {Array.from({ length: 36 }).map((_, index) => (
          <div
            key={index}
            className={index % 3 === 0 ? "bg-black" : "bg-black/10"}
          />
        ))}
      </div>
    </div>
  )
}

function AppointmentConfirmContent() {
  const params = useSearchParams()
  const hospital = params.get("hospital") ?? "Sunrise Women Care"
  const doctor = params.get("doctor") ?? "Dr. Mira Nair"
  const dateParam = params.get("date")
  const date = dateParam ? format(parseISO(dateParam), "dd MMM yyyy") : "--"
  const time = params.get("time") ?? "--"

  return (
    <div className="space-y-6 fade-slide">
      <Card title="Appointment confirmed" subtitle="Show this QR at the desk." className="card-highlight">
        <div className="flex flex-col items-center gap-4">
          <QRPlaceholder />
          <div className="space-y-2 text-sm text-black/70">
            <div>
              <span className="font-semibold text-text">Hospital:</span> {hospital}
            </div>
            <div>
              <span className="font-semibold text-text">Doctor:</span> {doctor}
            </div>
            <div>
              <span className="font-semibold text-text">Date:</span> {date}
            </div>
            <div>
              <span className="font-semibold text-text">Time:</span> {time}
            </div>
          </div>
        </div>
      </Card>
      <div className="flex flex-wrap gap-3">
        <Button variant="secondary">Download</Button>
        <Button>Share</Button>
      </div>
    </div>
  )
}

export default function AppointmentConfirm() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AppointmentConfirmContent />
    </Suspense>
  )
}
