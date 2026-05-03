"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export type ButtonVariant = "primary" | "secondary" | "ghost" | "outline"

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-highlight to-accent-200 text-white shadow-soft hover:opacity-95",
  secondary:
    "bg-white text-text border border-black/5 shadow-soft hover:bg-base-50",
  ghost: "bg-transparent text-text hover:bg-black/5",
  outline:
    "bg-transparent text-text border border-black/10 hover:bg-black/5"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "pressable inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition",
        variantStyles[variant],
        className
      )}
      {...props}
    />
  )
)

Button.displayName = "Button"

export { Button }
