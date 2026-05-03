"use client"

import { useMemo } from "react"
import { addDays, addMonths, eachDayOfInterval, endOfMonth, format, isSameDay, startOfMonth, startOfWeek, endOfWeek, isSameMonth } from "date-fns"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type CalendarModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  selected?: Date
  onSelect: (date: Date) => void
  currentMonth: Date
  onMonthChange: (date: Date) => void
}

export function CalendarModal({
  open,
  onOpenChange,
  selected,
  onSelect,
  currentMonth,
  onMonthChange
}: CalendarModalProps) {
  const days = useMemo(() => {
    const monthStart = startOfMonth(currentMonth)
    const monthEnd = endOfMonth(monthStart)
    const start = startOfWeek(monthStart, { weekStartsOn: 1 })
    const end = endOfWeek(monthEnd, { weekStartsOn: 1 })
    return eachDayOfInterval({ start, end })
  }, [currentMonth])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent open={open} className="bottom-sheet max-w-md">
        <div className="flex items-center justify-between">
          <div className="text-base font-semibold">
            {format(currentMonth, "MMMM yyyy")}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              onClick={() => onMonthChange(addMonths(currentMonth, -1))}
            >
              <ChevronLeft size={18} />
            </Button>
            <Button
              variant="ghost"
              onClick={() => onMonthChange(addMonths(currentMonth, 1))}
            >
              <ChevronRight size={18} />
            </Button>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-7 gap-2 text-xs text-black/50">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
            <div key={day} className="text-center">
              {day}
            </div>
          ))}
        </div>
        <div className="mt-3 grid grid-cols-7 gap-2">
          {days.map((day) => {
            const isSelected = selected && isSameDay(day, selected)
            const inMonth = isSameMonth(day, currentMonth)
            return (
              <button
                type="button"
                key={day.toISOString()}
                onClick={() => {
                  onSelect(day)
                  onOpenChange(false)
                }}
                className={cn(
                  "flex h-11 min-w-[44px] items-center justify-center rounded-xl text-sm",
                  isSelected
                    ? "bg-highlight text-white"
                    : inMonth
                    ? "bg-black/5 text-text"
                    : "bg-black/2 text-black/30"
                )}
              >
                {format(day, "d")}
              </button>
            )
          })}
        </div>
        <div className="mt-4 flex items-center justify-between">
          <Button
            variant="secondary"
            onClick={() => onSelect(addDays(new Date(), 1))}
          >
            Tomorrow
          </Button>
          <Button onClick={() => onOpenChange(false)} variant="primary">
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
