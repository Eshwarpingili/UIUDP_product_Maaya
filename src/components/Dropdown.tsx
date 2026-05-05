"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

type Option = {
  label: string
  value: string
}

type DropdownProps = {
  label?: string
  options: Option[]
  value?: string
  onChange: (value: string) => void
  className?: string
}

export function Dropdown({ label, options, value, onChange, className }: DropdownProps) {
  const [open, setOpen] = useState(false)
  const current = options.find((option) => option.value === value)

  return (
    <div className={cn("relative", className)}>
      {label && <div className="mb-2 text-xs font-semibold text-black/60">{label}</div>}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="pressable flex w-full h-14 items-center justify-between rounded-xl border border-slate-200 bg-white px-4 text-left text-lg text-text shadow-none"
      >
        <span>{current?.label ?? "Select"}</span>
        <ChevronDown size={16} />
      </button>
      {open && (
        <div className="absolute z-20 mt-2 w-full rounded-2xl border border-black/5 bg-white p-2 shadow-soft">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value)
                setOpen(false)
              }}
              className={cn(
                "w-full rounded-xl px-3 py-2 text-left text-sm",
                option.value === value
                  ? "bg-highlight/10 text-highlight"
                  : "text-text hover:bg-black/5"
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
