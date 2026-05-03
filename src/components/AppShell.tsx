"use client"

import type { ReactNode } from "react"
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

  return (
    <div className="page-container bg-base-50">
      <div className="app-blob one" />
      <div className="app-blob two" />
      <TopBar onSOS={() => setSOSOpen(true)} />
      <SOSModal />
      <main className="page-content relative z-10">{children}</main>
      <Chatbot />
      <BottomNav />
    </div>
  )
}
