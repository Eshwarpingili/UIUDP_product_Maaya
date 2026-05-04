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
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
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
        "dialog-content fixed z-50 bg-white w-[90%] max-w-sm mx-auto left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl p-4 max-h-[80vh] overflow-y-auto overflow-x-hidden shadow-soft",
        className
      )}
    >
      {children}
    </div>
  )
}
