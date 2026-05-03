"use client"

import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { Card } from "@/components/Card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useAppStore } from "@/store/useAppStore"

type FormValues = {
  name: string
  age: number
}

export default function MotherStep1() {
  const router = useRouter()
  const { pregnancyData, updatePregnancyData } = useAppStore()
  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      name: pregnancyData.name,
      age: pregnancyData.age
    }
  })

  const onSubmit = (data: FormValues) => {
    updatePregnancyData({ name: data.name, age: data.age })
    router.push("/onboarding/mother/step-2")
  }

  return (
    <Card title="About you" subtitle="Tell us your name and age.">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input placeholder="Full name" {...register("name")} />
        <Input type="number" placeholder="Age" {...register("age", { valueAsNumber: true })} />
        <div className="flex justify-end">
          <Button type="submit">Next</Button>
        </div>
      </form>
    </Card>
  )
}
