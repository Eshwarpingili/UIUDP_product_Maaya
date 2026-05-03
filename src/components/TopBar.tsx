"use client"

import { ShieldAlert } from "lucide-react"
import { Button } from "@/components/ui/button"

type TopBarProps = {
  onSOS: () => void
}

export function TopBar({ onSOS }: TopBarProps) {
  return (
    <div className="sticky top-0 z-30 flex items-center justify-between bg-base-50/90 px-5 py-4 backdrop-blur">
      <div>
        <div className="text-lg font-semibold text-text">Maaya Care</div>
        <div className="text-xs text-black/60">Your pregnancy companion</div>
      </div>
      <Button onClick={onSOS} className="rounded-full px-4" variant="outline">
        <ShieldAlert size={16} /> SOS
      </Button>
    </div>
  )
}
