"use client"

import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { Card } from "@/components/Card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

type FormValues = {
  inviteCode: string
  relationship: string
}

export default function SupportStep2() {
  const router = useRouter()
  const { register, handleSubmit } = useForm<FormValues>()

  const onSubmit = () => {
    router.push("/onboarding/support/step-3")
  }

  return (
    <Card title="Connect to mother" subtitle="Enter invite code and relationship.">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input placeholder="Invite code" {...register("inviteCode")} />
        <Input placeholder="Relationship (partner, parent)" {...register("relationship")} />
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
