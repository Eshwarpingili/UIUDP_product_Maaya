"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Copy, Check, Link2 } from "lucide-react"
import { useAppStore } from "@/store/useAppStore"

type ConnectPartnerModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ConnectPartnerModal({ open, onOpenChange }: ConnectPartnerModalProps) {
  const pregnancyData = useAppStore((state) => state.pregnancyData)
  const [copied, setCopied] = useState(false)

  const inviteCode = pregnancyData.supportInvite || "ABCD-2026"

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(inviteCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy!", err)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent open={open}>
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-highlight/20 text-highlight">
              <Link2 size={24} />
            </div>
            <div>
              <div className="text-lg font-bold text-text">Connect Partner</div>
              <div className="text-sm text-black/60">Share this code with your partner</div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
            <div className="text-xs text-black/50 font-medium uppercase tracking-wide mb-1">
              Your Invite Code
            </div>
            <div className="text-2xl font-bold text-text tracking-wider font-mono">
              {inviteCode}
            </div>
          </div>

          <div className="text-sm text-black/70">
            Ask your partner to enter this code when they sign up as &quot;Support&quot; to see your
            pregnancy updates and appointments.
          </div>

          <Button onClick={handleCopy} className="w-full h-12 text-base font-semibold">
            {copied ? (
              <span className="flex items-center gap-2">
                <Check size={18} />
                Copied!
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Copy size={18} />
                Copy Code
              </span>
            )}
          </Button>

          <Button variant="ghost" onClick={() => onOpenChange(false)} className="w-full">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}