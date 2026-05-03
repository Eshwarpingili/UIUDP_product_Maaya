"use client"

import { format } from "date-fns"
import { Card } from "@/components/Card"
import { Calendar, Stethoscope } from "lucide-react"

type AppointmentCardProps = {
  doctor: string
  hospital: string
  date: string
  time: string
  status?: string
}

export function AppointmentCard({ doctor, hospital, date, time, status }: AppointmentCardProps) {
  return (
    <Card>
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm font-semibold text-text">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-black/5">
              <Stethoscope size={16} />
            </span>
            {doctor}
          </div>
          <div className="text-xs text-black/60">{hospital}</div>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2 text-sm text-black/70">
        <Calendar size={16} />
        {format(new Date(date), "dd MMM yyyy")} · {time}
      </div>
      {status && <div className="mt-2 text-xs text-black/50">{status}</div>}
    </Card>
  )
}
