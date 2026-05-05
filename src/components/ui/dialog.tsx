"use client"

import { useEffect, useState, type ReactNode } from "react"
import { createPortal } from "react-dom"
import { cn } from "@/lib/utils"


type DialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: ReactNode
}

export function Dialog({ open, onOpenChange, children }: DialogProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (open) {
      document.body.classList.add("dialog-open")
    } else {
      document.body.classList.remove("dialog-open")
    }
    return () => {
      document.body.classList.remove("dialog-open")
    }
  }, [open])

  if (!mounted) return null

  return createPortal(
    <div data-open={open}>
      {open && (
        <div
          className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm"
          onClick={() => onOpenChange(false)}
        />
      )}
      {children}
    </div>,
    document.body
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
    <div className={cn("fixed inset-0 z-[101] flex p-4 pointer-events-none", className?.includes("bottom-sheet") ? "items-end p-0" : "items-center justify-center")}>
      <div
        className={cn(
          "dialog-content bg-white w-full max-w-sm rounded-2xl p-4 max-h-[80vh] overflow-y-auto overflow-x-hidden shadow-soft pointer-events-auto relative",
          className
        )}
      >
        {children}
      </div>
    </div>
  )
}
