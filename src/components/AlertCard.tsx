"use client"

import { Badge } from "@/components/ui/badge"
import { AlertCircle, Info, ShieldCheck } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { ReminderModal } from "./ReminderModal"

type AlertCardProps = {
  title: string
  description: string
  level: "green" | "yellow" | "red"
  className?: string
}

const toneMap = {
  green: "success",
  yellow: "warning",
  red: "danger"
} as const

const backgroundMap = {
  green: "bg-green-100",
  yellow: "bg-yellow-100",
  red: "bg-red-100"
} as const

const tagMap = {
  green: "Info",
  yellow: "Lifestyle",
  red: "Urgent"
} as const

const iconMap = {
  green: ShieldCheck,
  yellow: Info,
  red: AlertCircle
} as const

export function AlertCard({ title, description, level, className }: AlertCardProps) {
  const Icon = iconMap[level]
  const [showReminderModal, setShowReminderModal] = useState(false)

  return (
    <>
      <div className={cn("rounded-2xl p-4 shadow-card", backgroundMap[level], className)}>
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-semibold text-text">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white shadow-sm">
              <Icon size={16} />
            </span>
            {title}
          </div>
          <Badge tone={toneMap[level]}>{tagMap[level]}</Badge>
        </div>
        <div className="text-xs text-black/80 font-medium mb-3">{description}</div>
        <button 
          onClick={() => setShowReminderModal(true)}
          className="w-full min-h-[44px] bg-white/80 hover:bg-white text-sm font-medium rounded-xl py-2 shadow-sm transition active:scale-[0.97]"
        >
          Send Reminder
        </button>
      </div>

      <ReminderModal 
        open={showReminderModal} 
        onOpenChange={setShowReminderModal}
        alertTitle={title}
      />
    </>
  )
}
