"use client"

import type { ReactNode } from "react"
import { Button } from "@/components/ui/button"

type OnboardingStepProps = {
  title: string
  subtitle: string
  children: ReactNode
  onBack?: () => void
  onNext?: () => void
  isNextSubmit?: boolean
  nextLabel?: string
  formId?: string
}

export function OnboardingStep({
  title,
  subtitle,
  children,
  onBack,
  onNext,
  isNextSubmit = true,
  nextLabel = "Next",
  formId
}: OnboardingStepProps) {
  return (
    <div className="flex flex-col flex-1 h-full min-h-full">
      <div className="mb-10 pt-4">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-3">{title}</h1>
        <p className="text-base text-slate-600">{subtitle}</p>
      </div>
      
      <div className="flex-1 flex flex-col">
        {children}
      </div>

      <div className="mt-auto flex gap-3 pt-8">
        {onBack && (
          <Button variant="outline" type="button" className="flex-1 h-14 text-base font-semibold" onClick={onBack}>
            Back
          </Button>
        )}
        {isNextSubmit && formId ? (
          <Button type="submit" form={formId} className="flex-1 h-14 text-base font-semibold">
            {nextLabel}
          </Button>
        ) : (
          <Button type="button" onClick={onNext} className="flex-1 h-14 text-base font-semibold">
            {nextLabel}
          </Button>
        )}
      </div>
    </div>
  )
}
