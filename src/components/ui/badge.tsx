"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  tone?: "default" | "success" | "warning" | "danger"
}

const toneStyles: Record<NonNullable<BadgeProps["tone"]>, string> = {
  default: "bg-black/5 text-text",
  success: "bg-emerald-100 text-emerald-800",
  warning: "bg-amber-100 text-amber-800",
  danger: "bg-rose-100 text-rose-800"
}

export function Badge({ className, tone = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
        toneStyles[tone],
        className
      )}
      {...props}
    />
  )
}
