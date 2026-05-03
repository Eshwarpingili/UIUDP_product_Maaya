"use client"

import Link from "next/link"
import { differenceInDays, format, parseISO } from "date-fns"
import { Card } from "@/components/Card"
import { Button } from "@/components/ui/button"
import { useAppStore } from "@/store/useAppStore"
import { AlertCard } from "@/components/AlertCard"
import { AppointmentCard } from "@/components/AppointmentCard"
import { BabyGrowthIllustration } from "@/components/Illustrations"

export default function HomePage() {
  const { userRole, pregnancyData, alerts, appointments } = useAppStore()

  if (userRole === "support") {
    return (
      <div className="space-y-6 fade-slide">
        <Card title="Mother status" subtitle="Read-only overview for support.">
          <div className="text-sm text-black/70">
            {pregnancyData.name} is {pregnancyData.age} years old. Due date is
            {" "}{format(parseISO(pregnancyData.dueDate), "dd MMM yyyy")}.
          </div>
          <div className="mt-3 text-xs text-black/50">
            Conditions: {pregnancyData.conditions.join(", ")}
          </div>
        </Card>
        <div>
          <div className="section-title">Alerts</div>
          <div className="mt-3 grid gap-3">
            {alerts.map((alert) => (
              <AlertCard key={alert.id} {...alert} />
            ))}
          </div>
        </div>
        <div>
          <div className="section-title">Appointments</div>
          <div className="mt-3 grid gap-3">
            {appointments.map((appointment) => (
              <AppointmentCard key={appointment.id} {...appointment} />
            ))}
          </div>
        </div>
      </div>
    )
  }

  const daysRemaining = differenceInDays(parseISO(pregnancyData.dueDate), new Date())
  const trimester = daysRemaining > 180 ? "First" : daysRemaining > 90 ? "Second" : "Third"

  const progress = Math.min(100, Math.max(0, Math.round(((280 - daysRemaining) / 280) * 100)))

  // SVG Circular Progress Setup
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="space-y-6 fade-slide">
      <div className="relative overflow-hidden rounded-2xl bg-white p-5 shadow-card card-gradient">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-text mb-1">Hi, {pregnancyData.name.split(' ')[0]}</h1>
            <div className="text-sm font-medium text-highlight mb-4">{trimester} Trimester</div>
            
            <div className="flex flex-col gap-1">
              <span className="text-3xl font-bold text-text leading-none">{daysRemaining}</span>
              <span className="text-xs text-black/50 font-medium tracking-wide uppercase">DAYS REMAINING</span>
            </div>
            
            <div className="mt-4 text-xs font-medium text-black/70 flex items-center gap-1.5 bg-black/5 w-max px-2.5 py-1 rounded-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-highlight"></span>
              Due: {format(parseISO(pregnancyData.dueDate), "MMM dd, yyyy")}
            </div>
          </div>
          
          <div className="relative flex flex-col items-center">
            {/* Circular Progress Indicator */}
            <div className="relative w-[100px] h-[100px] flex items-center justify-center">
              <svg className="w-full h-full -rotate-90 transform absolute inset-0 z-0">
                <circle
                  cx="50"
                  cy="50"
                  r={radius}
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  className="text-black/5"
                />
                <circle
                  cx="50"
                  cy="50"
                  r={radius}
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className="text-highlight transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="z-10 bg-white/50 backdrop-blur-sm p-2 rounded-full w-14 h-14 flex items-center justify-center shadow-sm">
                <BabyGrowthIllustration />
              </div>
            </div>
            <div className="mt-2 text-[10px] font-bold text-highlight bg-highlight/10 px-2 py-0.5 rounded-full">
              {progress}%
            </div>
          </div>
        </div>
      </div>
      <Card title="Quick actions" subtitle="Jump to key tasks.">
        <div className="grid grid-cols-3 gap-3">
          <Link href="/body" className="flex flex-col items-center justify-center gap-2 pressable p-3 rounded-2xl bg-black/5 hover:bg-black/10 transition-colors">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-highlight"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            </div>
            <span className="text-xs font-semibold text-center leading-tight">Body<br/>Status</span>
          </Link>
          <Link href="/appointment" className="flex flex-col items-center justify-center gap-2 pressable p-3 rounded-2xl bg-black/5 hover:bg-black/10 transition-colors">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>
            </div>
            <span className="text-xs font-semibold text-center leading-tight">Book<br/>Visit</span>
          </Link>
          <Link href="/reports/upload" className="flex flex-col items-center justify-center gap-2 pressable p-3 rounded-2xl bg-black/5 hover:bg-black/10 transition-colors">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#a78bfa]"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
            </div>
            <span className="text-xs font-semibold text-center leading-tight">Upload<br/>Report</span>
          </Link>
        </div>
      </Card>
      
      <div className="relative overflow-hidden rounded-2xl p-5 shadow-card card-highlight">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-full bg-white/50 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-highlight"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          </div>
          <div>
            <h3 className="font-semibold text-sm">Maaya's Insight</h3>
            <p className="text-[10px] uppercase tracking-wider text-black/60 font-semibold">BASED ON RECENT REPORTS</p>
          </div>
        </div>
        <p className="text-sm text-black/80 font-medium leading-snug">
          Your energy levels are stable and hydration needs a small boost. Baby growth is on track and your blood pressure remains steady. Continue light movement and rest.
        </p>
      </div>
    </div>
  )
}
