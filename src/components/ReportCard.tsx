"use client"

import Link from "next/link"
import { format } from "date-fns"
import { Card } from "@/components/Card"
import { Badge } from "@/components/ui/badge"

type ReportCardProps = {
  id: string
  title: string
  date: string
  summary: string
  location: string
  status: "stable" | "followup" | "critical"
  thumbnail?: string
}

const statusTone = {
  stable: "success",
  followup: "warning",
  critical: "danger"
} as const

export function ReportCard({ id, title, date, summary, location, status, thumbnail }: ReportCardProps) {
  return (
    <Link href={`/reports/${id}`}>
      <Card>
        <div className="flex gap-4">
          <div className="h-16 w-16 overflow-hidden rounded-xl bg-black/5">
            <img
              src={thumbnail ?? "/mock/report-1.svg"}
              alt="Report thumbnail"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="text-sm font-semibold text-text">{title}</div>
                <div className="text-xs text-black/60">
                  {format(new Date(date), "dd MMM yyyy")} · {location}
                </div>
              </div>
              <Badge tone={statusTone[status]}>{status}</Badge>
            </div>
            <div className="mt-2 text-xs text-black/70">{summary}</div>
          </div>
        </div>
      </Card>
    </Link>
  )
}
