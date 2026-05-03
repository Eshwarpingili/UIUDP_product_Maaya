"use client"

import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { Card } from "@/components/Card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

type FormValues = {
  name: string
  email: string
}

export default function SupportStep1() {
  const router = useRouter()
  const { register, handleSubmit } = useForm<FormValues>()

  const onSubmit = () => {
    router.push("/onboarding/support/step-2")
  }

  return (
    <Card title="Support account" subtitle="Create your support profile.">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input placeholder="Full name" {...register("name")} />
        <Input type="email" placeholder="Email" {...register("email")} />
        <div className="flex justify-end">
          <Button type="submit">Next</Button>
        </div>
      </form>
    </Card>
  )
}
