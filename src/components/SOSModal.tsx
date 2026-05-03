"use client"

import { PhoneCall, Shield, BellRing, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useUIStore } from "@/store/useUIStore"

export function SOSModal() {
  const sosOpen = useUIStore((state) => state.sosOpen)
  const setSOSOpen = useUIStore((state) => state.setSOSOpen)

  if (!sosOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/40 p-4">
      <div className="bottom-sheet mx-auto flex h-[85%] max-w-md flex-col rounded-2xl bg-white p-6 shadow-soft overflow-x-hidden">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-lg font-semibold text-text">SOS Assistance</div>
            <div className="text-sm text-black/60">
              Choose an emergency action
            </div>
          </div>
          <Button variant="ghost" onClick={() => setSOSOpen(false)}>
            <X size={18} />
          </Button>
        </div>

        <img src="/images/sos-emergency.png" alt="Emergency" className="w-full rounded-xl object-cover mb-4" />

        <div className="mt-6 space-y-3">
          <Button className="w-full justify-start" variant="primary">
            <PhoneCall size={18} /> Call Emergency
          </Button>
          <Button className="w-full justify-start" variant="secondary">
            <BellRing size={18} /> Notify Support
          </Button>
          <Button className="w-full justify-start" variant="outline">
            <Shield size={18} /> Emergency Instructions
          </Button>
        </div>
        <div className="mt-auto text-xs text-black/60">
          These actions are simulated in this demo.
        </div>
      </div>
    </div>
  )
}
