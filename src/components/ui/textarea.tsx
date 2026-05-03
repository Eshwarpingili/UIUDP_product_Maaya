"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "flex min-h-[100px] w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-text shadow-soft outline-none transition placeholder:text-black/40 focus:border-highlight focus:ring-2 focus:ring-highlight/20",
      className
    )}
    {...props}
  />
))

Textarea.displayName = "Textarea"

export { Textarea }
