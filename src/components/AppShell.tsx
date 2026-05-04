"use client"

import type { ReactNode } from "react"
import { usePathname } from "next/navigation"
import { TopBar } from "@/components/TopBar"
import { BottomNav } from "@/components/BottomNav"
import { Chatbot } from "@/components/Chatbot"
import { SOSModal } from "@/components/SOSModal"
import { useUIStore } from "@/store/useUIStore"

type AppShellProps = {
  children: ReactNode
}

export function AppShell({ children }: AppShellProps) {
  const setSOSOpen = useUIStore((state) => state.setSOSOpen)
  const pathname = usePathname()
  
  const isHeroScreen = pathname === "/"
  const isAuthOrOnboarding = isHeroScreen || pathname.startsWith("/onboarding")

  if (isHeroScreen) {
    return (
      <div className="min-h-[100dvh] flex flex-col items-center justify-center px-4 bg-[#f4f4f5]">
        {children}
      </div>
    )
  }

  return (
    <div className="page-container flex flex-col bg-[#f4f4f5] min-h-[100dvh]">
      <div className="app-blob one" />
      <div className="app-blob two" />
      {!isAuthOrOnboarding && <TopBar onSOS={() => setSOSOpen(true)} />}
      {!isAuthOrOnboarding && <SOSModal />}
      <main className="page-content flex-1 overflow-y-auto relative z-10 pt-4 pb-44 w-full max-w-sm mx-auto px-4">
        {children}
      </main>
      {!isAuthOrOnboarding && <Chatbot />}
      {!isAuthOrOnboarding && <BottomNav />}
    </div>
  )
}
