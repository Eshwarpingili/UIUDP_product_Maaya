"use client"

import { cn } from "@/lib/utils"

import type { ReactNode } from "react"

type CardProps = {
  title?: string
  subtitle?: string
  children?: ReactNode
  className?: string
  action?: ReactNode
}

export function Card({ title, subtitle, children, className, action }: CardProps) {
  return (
    <div
      className={cn(
        "pressable rounded-2xl border border-white/70 bg-white/80 p-5 shadow-card backdrop-blur card-gradient hover:shadow-soft",
        className
      )}
    >
      {(title || subtitle || action) && (
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            {title && <div className="text-base font-semibold text-text">{title}</div>}
            {subtitle && <div className="text-sm text-black/60">{subtitle}</div>}
          </div>
          {action}
        </div>
      )}
      {children}
    </div>
  )
}
