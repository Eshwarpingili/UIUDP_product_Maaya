"use client"

import Link from "next/link"
import { Card } from "@/components/Card"
import { Button } from "@/components/ui/button"
import { useAppStore } from "@/store/useAppStore"
import { ReportCard } from "@/components/ReportCard"

export default function ReportsPage() {
  const reports = useAppStore((state) => state.reports)

  return (
    <div className="space-y-6 fade-slide">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Reports</h2>
          <p className="text-sm text-black/60">Summaries from recent checkups.</p>
        </div>
        <Link href="/reports/upload">
          <Button>Upload</Button>
        </Link>
      </div>
      <Card title="AI summary" subtitle="Highlights from your latest reports." className="card-highlight">
        <p className="text-sm text-black/70">
          Recent scans are stable. Iron levels need attention and hydration goals were missed twice this week.
        </p>
      </Card>
      <div className="flex justify-end">
        <Link href="/reports/previous">
          <Button variant="secondary">Previous reports</Button>
        </Link>
      </div>
      <div className="grid gap-4">
        {reports.slice(0, 2).map((report) => (
          <ReportCard key={report.id} {...report} thumbnail={report.images[0]} />
        ))}
      </div>
    </div>
  )
}
