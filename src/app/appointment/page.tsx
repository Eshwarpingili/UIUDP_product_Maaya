"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { Card } from "@/components/Card"
import { Dropdown } from "@/components/Dropdown"
import { Button } from "@/components/ui/button"
import { CalendarModal } from "@/components/CalendarModal"

const hospitalOptions = [
  { label: "Sunrise Women Care", value: "Sunrise Women Care" },
  { label: "Lotus Diagnostics", value: "Lotus Diagnostics" },
  { label: "City Hospital", value: "City Hospital" }
]

const doctorOptions = [
  { label: "Dr. Mira Nair", value: "Dr. Mira Nair" },
  { label: "Dr. Anil Rao", value: "Dr. Anil Rao" },
  { label: "Dr. Priya Shah", value: "Dr. Priya Shah" }
]

const timeSlots = ["09:30 AM", "10:30 AM", "11:15 AM", "02:00 PM", "04:30 PM"]

export default function AppointmentPage() {
  const router = useRouter()
  const [hospital, setHospital] = useState(hospitalOptions[0].value)
  const [doctor, setDoctor] = useState(doctorOptions[0].value)
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [open, setOpen] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [slot, setSlot] = useState(timeSlots[1])

  const formattedDate = useMemo(() =>
    (date ? format(date, "dd MMM yyyy") : "Select date"),
  [date])

  return (
    <div className="space-y-6 fade-slide">
      <Card title="Book appointment" subtitle="Select hospital, doctor, date, and time.">
        <div className="mb-4">
          <div className="flex items-center gap-2 text-xs text-black/60">
            <span className="h-2 w-2 rounded-full bg-highlight" /> Hospital
            <span className="h-2 w-2 rounded-full bg-black/20" /> Doctor
            <span className="h-2 w-2 rounded-full bg-black/20" /> Date
            <span className="h-2 w-2 rounded-full bg-black/20" /> Confirm
          </div>
          <div className="mt-2 h-2 rounded-full bg-black/5">
            <div className="h-2 w-1/2 rounded-full bg-gradient-to-r from-highlight to-accent-200" />
          </div>
        </div>
        <div className="space-y-4">
          <Dropdown label="Hospital" options={hospitalOptions} value={hospital} onChange={setHospital} />
          <Dropdown label="Doctor" options={doctorOptions} value={doctor} onChange={setDoctor} />
          <div>
            <div className="mb-2 text-xs font-semibold text-black/60">Date</div>
            <Button variant="secondary" onClick={() => setOpen(true)}>
              {formattedDate}
            </Button>
          </div>
          <div>
            <div className="mb-2 text-xs font-semibold text-black/60">Time slot</div>
            <div className="flex flex-wrap gap-2">
              {timeSlots.map((time) => (
                <Button
                  key={time}
                  variant={slot === time ? "primary" : "outline"}
                  onClick={() => setSlot(time)}
                >
                  {time}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex justify-end">
            <Button
              onClick={() =>
                router.push(
                  `/appointment/confirm?hospital=${encodeURIComponent(hospital)}&doctor=${encodeURIComponent(
                    doctor
                  )}&date=${encodeURIComponent(date?.toISOString() ?? "")}&time=${encodeURIComponent(slot)}`
                )
              }
            >
              Next
            </Button>
          </div>
        </div>
      </Card>
      <CalendarModal
        open={open}
        onOpenChange={setOpen}
        selected={date}
        onSelect={setDate}
        currentMonth={currentMonth}
        onMonthChange={setCurrentMonth}
      />
    </div>
  )
}
