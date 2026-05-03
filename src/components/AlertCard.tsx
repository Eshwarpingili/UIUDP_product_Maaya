"use client"

import { Badge } from "@/components/ui/badge"
import { AlertCircle, Info, ShieldCheck } from "lucide-react"
import { cn } from "@/lib/utils"

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

const borderMap = {
  green: "border-l-4 border-emerald-400",
  yellow: "border-l-4 border-amber-400",
  red: "border-l-4 border-rose-400"
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
  return (
    <div className={cn("rounded-2xl bg-white p-4 shadow-card", borderMap[level], className)}>
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold text-text">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-black/5">
            <Icon size={16} />
          </span>
          {title}
        </div>
        <Badge tone={toneMap[level]}>{tagMap[level]}</Badge>
      </div>
      <div className="text-xs text-black/60">{description}</div>
    </div>
  )
}
