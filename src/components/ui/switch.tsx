"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

type SwitchProps = {
  checked: boolean
  onCheckedChange: (value: boolean) => void
  disabled?: boolean
  className?: string
}

export function Switch({ checked, onCheckedChange, disabled, className }: SwitchProps) {
  return (
    <button
      type="button"
      aria-pressed={checked}
      onClick={() => !disabled && onCheckedChange(!checked)}
      className={cn(
        "relative inline-flex h-7 w-12 items-center rounded-full transition",
        checked ? "bg-highlight" : "bg-black/15",
        disabled ? "opacity-50" : "opacity-100",
        className
      )}
    >
      <span
        className={cn(
          "inline-block h-5 w-5 transform rounded-full bg-white shadow transition",
          checked ? "translate-x-6" : "translate-x-1"
        )}
      />
    </button>
  )
}
