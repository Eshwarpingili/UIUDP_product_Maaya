"use client"

import Link from "next/link"
import { Trash2, Pill, Leaf } from "lucide-react"
import { useAppStore } from "@/store/useAppStore"
import { Card } from "@/components/Card"
import { ConfirmDialog } from "@/components/ConfirmDialog"
import { Toast } from "@/components/Toast"
import { useState } from "react"

type Props = {
  params: { id: string }
}

export default function ReportDetail({ params }: Props) {
  const report = useAppStore((state) =>
    state.reports.find((item) => item.id === params.id)
  )
  const deleteReport = useAppStore((state) => state.deleteReport)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [toast, setToast] = useState(false)

  if (!report) {
    return (
      <div className="space-y-4">
        <Card title="Report not found" subtitle="We could not locate this report.">
          <p className="text-sm text-black/70">Try returning to the reports list.</p>
        </Card>
        <Link href="/reports" className="text-sm font-semibold text-highlight">
          Back to reports
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6 fade-slide">
      <Card title={report.title} subtitle={report.summary}>
        <div className="flex items-center justify-between">
          <div className="text-xs text-black/60">Swipe for more images</div>
          <button
            type="button"
            className="pressable rounded-xl bg-white/90 p-2 shadow-soft"
            onClick={() => setConfirmOpen(true)}
            aria-label="Delete report"
          >
            <Trash2 size={16} />
          </button>
        </div>
        <div className="scroll-snap mt-3 flex snap-x gap-3 overflow-x-auto pb-2">
          {report.images.map((src) => (
            <div
              key={src}
              className="flex h-40 w-60 snap-center flex-shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-black/5"
            >
              <img src={src} alt="Report image" className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      </Card>
      <Card title="Description">
        <p className="text-sm text-black/70">{report.description}</p>
      </Card>
      <Card title="Medicines">
        <ul className="space-y-2 text-sm text-black/70">
          {report.medicines.map((item) => (
            <li key={item} className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-black/5">
                <Pill size={16} />
              </span>
              {item}
            </li>
          ))}
        </ul>
      </Card>
      <Card title="Lifestyle suggestions">
        <ul className="space-y-2 text-sm text-black/70">
          {report.lifestyle.map((item) => (
            <li key={item} className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-black/5">
                <Leaf size={16} />
              </span>
              {item}
            </li>
          ))}
        </ul>
      </Card>
      <ConfirmDialog
        open={confirmOpen}
        title="Delete report"
        description="Are you sure you want to delete this report?"
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => {
          deleteReport(report.id)
          setConfirmOpen(false)
          setToast(true)
          setTimeout(() => setToast(false), 1600)
        }}
      />
      <Toast message="Report deleted" open={toast} />
    </div>
  )
}
