"use client"

import { useMemo, useState } from "react"
import { Trash2 } from "lucide-react"
import { useAppStore } from "@/store/useAppStore"
import { Dropdown } from "@/components/Dropdown"
import { ReportCard } from "@/components/ReportCard"
import { ConfirmDialog } from "@/components/ConfirmDialog"
import { Toast } from "@/components/Toast"

const filterOptions = [
  { label: "Date", value: "date" },
  { label: "Location", value: "location" },
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" }
]

export default function PreviousReports() {
  const reports = useAppStore((state) => state.reports)
  const deleteReport = useAppStore((state) => state.deleteReport)
  const [filter, setFilter] = useState("newest")
  const [confirmId, setConfirmId] = useState<string | null>(null)
  const [toast, setToast] = useState(false)

  const filtered = useMemo(() => {
    const copy = [...reports]
    if (filter === "location") {
      return copy.sort((a, b) => a.location.localeCompare(b.location))
    }
    if (filter === "oldest") {
      return copy.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    }
    return copy.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }, [reports, filter])

  return (
    <div className="space-y-5 fade-slide">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Previous reports</h2>
          <p className="text-sm text-black/60">Review past reports.</p>
        </div>
        <Dropdown options={filterOptions} value={filter} onChange={setFilter} />
      </div>
      <div className="grid gap-4 max-w-full">
        {filtered.map((report) => (
          <div key={report.id} className="relative min-w-0 max-w-full">
            <ReportCard {...report} thumbnail={report.images[0]} />
            <button
              type="button"
              onClick={() => setConfirmId(report.id)}
              className="pressable absolute right-3 top-3 rounded-xl bg-white/90 p-2 shadow-soft"
              aria-label="Delete report"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
      <ConfirmDialog
        open={!!confirmId}
        title="Delete report"
        description="Are you sure you want to delete this report?"
        onClose={() => setConfirmId(null)}
        onConfirm={() => {
          if (confirmId) {
            deleteReport(confirmId)
            setConfirmId(null)
            setToast(true)
            setTimeout(() => setToast(false), 1600)
          }
        }}
      />
      <Toast message="Report deleted" open={toast} />
    </div>
  )
}
