"use client"

import Link from "next/link"
import { format } from "date-fns"
import { Card } from "@/components/Card"
import { Badge } from "@/components/ui/badge"
import { Trash2 } from "lucide-react"
import { useState } from "react"
import { ConfirmDialog } from "@/components/ConfirmDialog"
import { useAppStore } from "@/store/useAppStore"
import { useRouter } from "next/navigation"

type ReportCardProps = {
  id: string
  title: string
  date: string
  summary: string
  location: string
  status: "stable" | "followup" | "critical"
  thumbnail?: string
  hideDelete?: boolean
}

const statusTone = {
  stable: "success",
  followup: "warning",
  critical: "danger"
} as const

export function ReportCard({ id, title, date, summary, location, status, thumbnail, hideDelete }: ReportCardProps) {
  const [showConfirm, setShowConfirm] = useState(false)
  const deleteReport = useAppStore((state) => state.deleteReport)
  const router = useRouter()

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setShowConfirm(true)
  }

  const confirmDelete = () => {
    deleteReport(id)
    setShowConfirm(false)
    router.refresh()
  }

  return (
    <>
      <Link href={`/reports/${id}`}>
        <Card className="relative hover:bg-black/5 transition-colors">
          <div className="flex gap-4">
            <div className="h-16 w-16 overflow-hidden rounded-xl bg-black/5 shrink-0">
              <img
                src={thumbnail ?? "/mock/report-1.svg"}
                alt="Report thumbnail"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex-1 pr-6 relative">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 truncate pr-2">
                  <div className="text-sm font-semibold text-text truncate">{title}</div>
                  <div className="text-xs text-black/60 truncate">
                    {format(new Date(date), "dd MMM yyyy")} · {location}
                  </div>
                </div>
                <Badge tone={statusTone[status]} className="shrink-0">{status}</Badge>
              </div>
              <div className="mt-2 text-xs text-black/70 line-clamp-2">{summary}</div>
            </div>
          </div>
          {!hideDelete && (
            <button
              onClick={handleDelete}
              className="absolute right-3 bottom-4 p-2 text-black/40 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors z-10"
              aria-label="Delete report"
            >
              <Trash2 size={16} />
            </button>
          )}
        </Card>
      </Link>
      
      <ConfirmDialog
        open={showConfirm}
        title="Delete Report"
        description="Are you sure you want to delete this report? This action cannot be undone."
        onClose={() => setShowConfirm(false)}
        onConfirm={confirmDelete}
      />
    </>
  )
}
