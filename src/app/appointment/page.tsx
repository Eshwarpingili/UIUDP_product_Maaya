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

  const steps = ["Hospital", "Doctor", "Date", "Confirm"]
  const currentStepIndex = 2 // Since we display everything in one form prior to Confirm, let's treat the progress bar contextually

  return (
    <div className="space-y-6 fade-slide">
      <div className="bg-white p-5 rounded-2xl shadow-card">
        <div className="flex justify-between items-center relative mb-2">
          {/* Progress Path */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-black/5 z-0" />
          <div 
            className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] bg-highlight z-0 transition-all" 
            style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
          />
          
          {steps.map((step, idx) => {
            const isCompleted = idx < currentStepIndex
            const isCurrent = idx === currentStepIndex
            return (
              <div key={step} className="relative z-10 flex flex-col items-center gap-1.5">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  isCompleted ? "bg-highlight text-white" : 
                  isCurrent ? "bg-white border-2 border-highlight text-highlight" : 
                  "bg-black/5 text-black/40"
                }`}>
                  {idx + 1}
                </div>
                <span className={`text-[10px] font-semibold uppercase tracking-wider ${isCurrent || isCompleted ? "text-highlight" : "text-black/40"}`}>
                  {step}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      <Card title="Book appointment" subtitle="Select hospital, doctor, date, and time.">
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
