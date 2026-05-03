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
  
  const isAuthOrOnboarding = pathname === "/" || pathname.startsWith("/onboarding")

  return (
    <div className="page-container bg-[#f4f4f5]">
      <div className="app-blob one" />
      <div className="app-blob two" />
      {!isAuthOrOnboarding && <TopBar onSOS={() => setSOSOpen(true)} />}
      {!isAuthOrOnboarding && <SOSModal />}
      <main className="page-content relative z-10 pt-4 pb-24 max-w-sm mx-auto px-4">{children}</main>
      {!isAuthOrOnboarding && <Chatbot />}
      {!isAuthOrOnboarding && <BottomNav />}
    </div>
  )
}
