"use client"

import { cn } from "@/lib/utils"

type IllustrationProps = {
  className?: string
}

export function BabyGrowthIllustration({ className }: IllustrationProps) {
  return (
    <svg
      className={cn("h-24 w-24", className)}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="60" cy="60" r="52" fill="url(#grad1)" />
      <circle cx="60" cy="62" r="30" fill="#ffffff" />
      <circle cx="49" cy="55" r="4" fill="#a5b4fc" />
      <circle cx="71" cy="55" r="4" fill="#a5b4fc" />
      <path d="M48 70c6 6 18 6 24 0" stroke="#a78bfa" strokeWidth="4" strokeLinecap="round" />
      <defs>
        <linearGradient id="grad1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fde68a" />
          <stop offset="100%" stopColor="#a5b4fc" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export function BodyChangeIllustration({ className }: IllustrationProps) {
  return (
    <svg
      className={cn("h-24 w-24", className)}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="18" y="18" width="84" height="84" rx="28" fill="url(#grad2)" />
      <path d="M60 36c-8 8-8 20 0 28 8 8 8 20 0 28" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
      <circle cx="60" cy="60" r="6" fill="#a78bfa" />
      <defs>
        <linearGradient id="grad2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#5eead4" />
          <stop offset="100%" stopColor="#a5b4fc" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export function HealthIllustration({ className }: IllustrationProps) {
  return (
    <svg
      className={cn("h-20 w-20", className)}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="60" cy="60" r="50" fill="url(#grad3)" />
      <path
        d="M35 62h12l6-14 8 28 7-18h12"
        stroke="#ffffff"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient id="grad3" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#5eead4" />
        </linearGradient>
      </defs>
    </svg>
  )
}
