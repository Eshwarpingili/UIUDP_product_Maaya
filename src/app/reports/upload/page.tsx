"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Card } from "@/components/Card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAppStore } from "@/store/useAppStore"

export default function UploadReport() {
  const router = useRouter()
  const addReport = useAppStore((state) => state.addReport)
  const [fileName, setFileName] = useState<string | null>(null)

  return (
    <div className="space-y-6 fade-slide">
      <Card title="Upload report" subtitle="Simulated camera + file upload." className="card-highlight">
        <div className="space-y-4">
          <div className="rounded-2xl border border-dashed border-black/20 bg-black/5 p-6 text-center">
            <div className="text-sm font-semibold">Camera preview</div>
            <p className="mt-1 text-xs text-black/60">Camera is simulated in this demo.</p>
          </div>
          <div className="w-full overflow-hidden">
            <Input
              type="file"
              className="w-full text-ellipsis"
              onChange={(event) => {
                const file = event.target.files?.[0]
                setFileName(file?.name ?? null)
              }}
            />
          </div>
          {fileName && (
            <div className="text-xs text-black/60">Selected file: {fileName}</div>
          )}
          <div className="flex justify-between">
            <Button variant="ghost" onClick={() => router.back()}>
              Back
            </Button>
            <Button
              onClick={() => {
                addReport({
                  id: `r-${Date.now()}`,
                  title: "New Upload",
                  date: new Date().toISOString(),
                  location: "Uploaded",
                  summary: "Report uploaded and awaiting AI summary.",
                  status: "stable",
                  description: "AI analysis will be ready soon.",
                  medicines: ["Prenatal vitamins"],
                  lifestyle: ["Rest after upload"],
                  images: ["/mock/report-1.svg"]
                })
                router.push("/reports")
              }}
            >
              Upload
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
