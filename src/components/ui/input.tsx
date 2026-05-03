"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(
        "flex min-h-[48px] w-full rounded-2xl border border-black/10 bg-white px-4 text-sm text-text shadow-soft outline-none transition placeholder:text-black/40 focus:border-highlight focus:ring-2 focus:ring-highlight/20",
        className
      )}
      {...props}
    />
  )
)

Input.displayName = "Input"

export { Input }
