"use client"

import { useMemo, useState } from "react"
import {
  addDays,
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameMonth,
  isToday,
  startOfMonth,
  startOfWeek
} from "date-fns"
import { Card } from "@/components/Card"
import { useAppStore } from "@/store/useAppStore"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function CalendarPage() {
  const router = useRouter()
  const [month, setMonth] = useState(new Date())
  const { appointments, pregnancyData } = useAppStore()

  const days = useMemo(() => {
    const start = startOfWeek(startOfMonth(month), { weekStartsOn: 1 })
    const end = endOfWeek(endOfMonth(month), { weekStartsOn: 1 })
    return eachDayOfInterval({ start, end })
  }, [month])

  const milestoneDates = [
    { label: "28-week check", offset: -84 },
    { label: "32-week scan", offset: -56 },
    { label: "36-week visit", offset: -28 }
  ]

  const dueDate = new Date(pregnancyData.dueDate)
  const milestoneEvents = milestoneDates.map((milestone) => ({
    date: addDays(dueDate, milestone.offset).toISOString(),
    title: milestone.label
  }))

  const appointmentEvents = appointments.map((appointment) => ({
    date: appointment.date,
    title: `${appointment.doctor} · ${appointment.time}`
  }))

  const events = [...appointmentEvents, ...milestoneEvents]

  return (
    <div className="space-y-6 fade-slide">
      <div className="flex items-center gap-2 mb-4">
        <button onClick={() => router.back()} className="pressable p-2 bg-white rounded-full shadow-soft">
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-xl font-bold text-text">Calendar</h1>
      </div>

      <img src="/images/Calendar-illustration.png" alt="Calendar" className="w-full rounded-xl object-cover mb-4" />

      <Card title="Calendar" subtitle="Appointments and milestones.">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => setMonth(addMonths(month, -1))}>
            Previous
          </Button>
          <div className="text-base font-semibold">{format(month, "MMMM yyyy")}</div>
          <Button variant="ghost" onClick={() => setMonth(addMonths(month, 1))}>
            Next
          </Button>
        </div>
        <div className="mt-3 flex items-center gap-3 text-xs text-black/60">
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-highlight" /> Appointment
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-accent-200" /> Milestone
          </span>
        </div>
        <div className="mt-4 grid grid-cols-7 gap-2 text-xs text-black/60">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((label) => (
            <div key={label} className="text-center">
              {label}
            </div>
          ))}
        </div>
        <div className="mt-2 grid grid-cols-7 gap-2">
          {days.map((day) => {
            const dayEvents = events.filter((event) =>
              format(new Date(event.date), "yyyy-MM-dd") === format(day, "yyyy-MM-dd")
            )
            return (
              <div
                key={day.toISOString()}
                className={
                  "rounded-xl border border-black/5 bg-white p-2 text-xs " +
                  (isSameMonth(day, month) ? "" : "opacity-40")
                }
              >
                <div className={isToday(day) ? "font-semibold text-highlight" : "text-black/70"}>
                  {format(day, "d")}
                </div>
                <div className="mt-2 flex flex-wrap gap-1">
                  {dayEvents.slice(0, 3).map((event) => (
                    <span
                      key={`${format(new Date(event.date), "yyyy-MM-dd")}-${event.title}`}
                      className={
                        "h-2 w-2 rounded-full " +
                        (event.title.includes("Dr.") ? "bg-highlight" : "bg-accent-200")
                      }
                    />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </Card>
    </div>
  )
}
