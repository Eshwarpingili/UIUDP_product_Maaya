"use client"

import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { format, parseISO } from "date-fns"
import { Card } from "@/components/Card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useAppStore } from "@/store/useAppStore"

type FormValues = {
  dueDate: string
}

export default function MotherStep2() {
  const router = useRouter()
  const { pregnancyData, updatePregnancyData } = useAppStore()
  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      dueDate: format(parseISO(pregnancyData.dueDate), "yyyy-MM-dd")
    }
  })

  const onSubmit = (data: FormValues) => {
    updatePregnancyData({ dueDate: new Date(data.dueDate).toISOString() })
    router.push("/onboarding/mother/step-3")
  }

  return (
    <Card title="Due date" subtitle="When is your expected due date?">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input type="date" {...register("dueDate")} />
        <div className="flex justify-between">
          <Button variant="ghost" type="button" onClick={() => router.back()}>
            Back
          </Button>
          <Button type="submit">Next</Button>
        </div>
      </form>
    </Card>
  )
}
