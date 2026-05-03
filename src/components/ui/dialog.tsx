"use client"

import type { ReactNode } from "react"
import { cn } from "@/lib/utils"


type DialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: ReactNode
}

export function Dialog({ open, onOpenChange, children }: DialogProps) {
  return (
    <div data-open={open}>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40"
          onClick={() => onOpenChange(false)}
        />
      )}
      {children}
    </div>
  )
}

type DialogContentProps = {
  open: boolean
  children: ReactNode
  className?: string
}

export function DialogContent({ open, className, children }: DialogContentProps) {
  if (!open) return null
  return (
    <div
      className={cn(
        "dialog-content fixed left-1/2 top-1/2 z-50 w-[92vw] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-5 shadow-soft",
        className
      )}
    >
      {children}
    </div>
  )
}
