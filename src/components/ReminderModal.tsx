"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Phone, BellRing, Users, X } from "lucide-react"

type ReminderModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  alertTitle: string
}

export function ReminderModal({ open, onOpenChange, alertTitle }: ReminderModalProps) {
  const handleAction = (action: string) => {
    // In a real app, we'd trigger a toast here using the UI store
    console.log(`Action triggered: ${action} for alert: ${alertTitle}`)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent open={open} className="px-2">
        <button 
          onClick={() => onOpenChange(false)}
          className="absolute top-3 right-3 p-1 rounded-full hover:bg-black/5 text-black/60 transition"
        >
          <X size={18} />
        </button>
        <div className="mb-4 text-center mt-2">
          <h2 className="text-lg font-bold text-text">Reminder Actions</h2>
          <p className="text-sm text-black/60">Choose how to handle: {alertTitle}</p>
        </div>
        <div className="grid gap-3">
          <button 
            onClick={() => handleAction('Call Mother')}
            className="flex items-center gap-3 w-full min-h-[44px] p-4 rounded-xl bg-black/5 hover:bg-black/10 transition active:scale-[0.97]"
          >
            <div className="p-2 bg-white rounded-full shadow-sm">
              <Phone size={18} className="text-[#a78bfa]" />
            </div>
            <span className="font-medium text-sm">Call Mother</span>
          </button>
          
          <button 
            onClick={() => handleAction('Trigger Reminder Again')}
            className="flex items-center gap-3 w-full min-h-[44px] p-4 rounded-xl bg-black/5 hover:bg-black/10 transition active:scale-[0.97]"
          >
            <div className="p-2 bg-white rounded-full shadow-sm">
              <BellRing size={18} className="text-[#5eead4]" />
            </div>
            <span className="font-medium text-sm">Trigger Reminder Again</span>
          </button>

          <button 
            onClick={() => handleAction('Notify Nearby Supporter')}
            className="flex items-center gap-3 w-full min-h-[44px] p-4 rounded-xl bg-black/5 hover:bg-black/10 transition active:scale-[0.97]"
          >
            <div className="p-2 bg-white rounded-full shadow-sm">
              <Users size={18} className="text-blue-400" />
            </div>
            <span className="font-medium text-sm">Notify Nearby Supporter</span>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
