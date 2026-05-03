"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { format, parseISO } from "date-fns"
import { Card } from "@/components/Card"
import { Button } from "@/components/ui/button"
import { Suspense } from "react"
import { QRCodeSVG } from "qrcode.react"
import { ChevronLeft } from "lucide-react"

function AppointmentConfirmContent() {
  const params = useSearchParams()
  const router = useRouter()
  const hospital = params.get("hospital") ?? "Sunrise Women Care"
  const doctor = params.get("doctor") ?? "Dr. Mira Nair"
  const dateParam = params.get("date")
  const date = dateParam ? format(parseISO(dateParam), "dd MMM yyyy") : "--"
  const time = params.get("time") ?? "--"

  const qrData = JSON.stringify({ hospital, doctor, date, time })

  return (
    <div className="space-y-6 fade-slide">
      <div className="flex items-center gap-2 mb-4">
        <button onClick={() => router.back()} className="pressable p-2 bg-white rounded-full shadow-soft">
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-xl font-bold text-text">Confirmation</h1>
      </div>

      <Card title="Appointment confirmed" subtitle="Show this QR at the desk." className="card-highlight">
        <div className="flex flex-col items-center gap-6">
          <div className="bg-white p-4 rounded-xl shadow-soft">
            <QRCodeSVG value={qrData} size={160} level="H" />
          </div>
          <div className="space-y-2 text-sm text-black/70 w-full text-center">
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
        <Button variant="secondary" className="flex-1">Download</Button>
        <Button className="flex-1">Share</Button>
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
