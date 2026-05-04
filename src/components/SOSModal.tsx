"use client"

import { PhoneCall, Shield, BellRing, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useUIStore } from "@/store/useUIStore"
import { Dialog, DialogContent } from "@/components/ui/dialog"

export function SOSModal() {
  const sosOpen = useUIStore((state) => state.sosOpen)
  const setSOSOpen = useUIStore((state) => state.setSOSOpen)

  if (!sosOpen) return null

  return (
    <Dialog open={sosOpen} onOpenChange={setSOSOpen}>
      <DialogContent open={sosOpen} className="px-2">
        <button 
          onClick={() => setSOSOpen(false)}
          className="absolute top-3 right-3 p-1 rounded-full hover:bg-black/5 text-black/60 transition"
        >
          <X size={18} />
        </button>
        
        <div className="flex flex-col items-center mb-4 mt-2 text-center">
          <div className="text-lg font-semibold text-text">SOS Assistance</div>
          <div className="text-sm text-black/60">
            Choose an emergency action
          </div>
        </div>

        <img src="/images/sos-emergency.png" alt="Emergency" className="w-full h-auto rounded-xl object-cover mb-4" />

        <div className="mt-6 space-y-3">
          <Button className="w-full justify-start min-h-[44px]" variant="default">
            <PhoneCall size={18} className="mr-2" /> Call Emergency
          </Button>
          <Button className="w-full justify-start min-h-[44px]" variant="secondary">
            <BellRing size={18} className="mr-2" /> Notify Support
          </Button>
          <Button className="w-full justify-start min-h-[44px]" variant="outline">
            <Shield size={18} className="mr-2" /> Emergency Instructions
          </Button>
        </div>
        <div className="mt-4 text-center text-xs text-black/60">
          These actions are simulated in this demo.
        </div>
      </DialogContent>
    </Dialog>
  )
}
