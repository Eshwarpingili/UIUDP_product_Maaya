"use client"

import { ShieldAlert } from "lucide-react"
import { Button } from "@/components/ui/button"

type TopBarProps = {
  onSOS: () => void
}

export function TopBar({ onSOS }: TopBarProps) {
  return (
    <div className="sticky top-0 z-30 flex items-center justify-between bg-base-50/90 backdrop-blur w-full">
      <div className="relative max-w-sm mx-auto w-full px-5 py-4 flex items-center justify-between overflow-x-hidden">
        <div>
          <div className="text-lg font-semibold text-text">Maaya Care</div>
          <div className="text-xs text-black/60">Your pregnancy companion</div>
        </div>
        <Button onClick={onSOS} className="absolute top-4 right-4 rounded-full px-4 min-h-[44px]" variant="outline">
          <ShieldAlert size={16} /> SOS
        </Button>
      </div>
    </div>
  )
}
