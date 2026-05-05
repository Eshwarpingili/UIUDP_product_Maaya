"use client"

import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { OnboardingStep } from "@/components/OnboardingStep"
import { Textarea } from "@/components/ui/textarea"
import { useAppStore } from "@/store/useAppStore"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

type FormValues = {
  conditions: string[]
  lifestyle: string
}

const COMMON_CONDITIONS = [
  "Gestational Diabetes",
  "High Blood Pressure",
  "Anemia",
  "Thyroid Issues",
  "None"
]

export default function MotherStep4() {
  const router = useRouter()
  const { pregnancyData, updatePregnancyData } = useAppStore()
  const { register, handleSubmit, watch, setValue } = useForm<FormValues>({
    defaultValues: {
      conditions: pregnancyData.conditions.length ? pregnancyData.conditions : ["None"],
      lifestyle: pregnancyData.lifestyle
    }
  })

  const selectedConditions = watch("conditions")

  const toggleCondition = (condition: string) => {
    if (condition === "None") {
      setValue("conditions", ["None"])
      return
    }

    let newConditions = selectedConditions.filter(c => c !== "None")
    
    if (newConditions.includes(condition)) {
      newConditions = newConditions.filter(c => c !== condition)
    } else {
      newConditions.push(condition)
    }

    if (newConditions.length === 0) {
      newConditions = ["None"]
    }

    setValue("conditions", newConditions)
  }

  const onSubmit = (data: FormValues) => {
    updatePregnancyData({
      conditions: data.conditions.filter(c => c !== "None"),
      lifestyle: data.lifestyle
    })
    router.push("/onboarding/mother/step-5")
  }

  return (
    <OnboardingStep
      title="Health & lifestyle"
      subtitle="Add conditions and lifestyle habits."
      formId="step4-form"
      onBack={() => router.back()}
    >
      <form id="step4-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="text-sm font-semibold text-slate-700 mb-3 block">Pre-existing Conditions</label>
          <div className="flex flex-wrap gap-2">
            {COMMON_CONDITIONS.map(condition => {
              const isSelected = selectedConditions.includes(condition)
              return (
                <button
                  key={condition}
                  type="button"
                  onClick={() => toggleCondition(condition)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all active:scale-[0.98]",
                    isSelected 
                      ? "border-highlight bg-highlight/10 text-highlight" 
                      : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                  )}
                >
                  {condition}
                  {isSelected && <Check size={14} />}
                </button>
              )
            })}
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold text-slate-700 mb-3 block">Lifestyle Habits</label>
          <Textarea 
            placeholder="e.g. daily walks, prenatal yoga, vegetarian diet" 
            {...register("lifestyle")} 
            className="min-h-[120px] text-base px-4 py-3 rounded-xl bg-white border-slate-200" 
          />
        </div>
      </form>
    </OnboardingStep>
  )
}
