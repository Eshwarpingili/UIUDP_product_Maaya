"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

type ConfirmDialogProps = {
  open: boolean
  title: string
  description: string
  confirmLabel?: string
  onConfirm: () => void
  onClose: () => void
}

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Delete",
  onConfirm,
  onClose
}: ConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent open={open} className="bottom-sheet max-w-md">
        <div className="space-y-3">
          <div className="text-lg font-semibold">{title}</div>
          <div className="text-sm text-black/60">{description}</div>
          <div className="mt-4 flex gap-3">
            <Button variant="secondary" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button onClick={onConfirm} className="flex-1">
              {confirmLabel}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
