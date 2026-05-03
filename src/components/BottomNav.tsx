"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, FileText, CalendarDays, HeartPulse, User } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "Home", href: "/home", icon: Home },
  { label: "Reports", href: "/reports", icon: FileText },
  { label: "Calendar", href: "/calendar", icon: CalendarDays },
  { label: "Health", href: "/health", icon: HeartPulse },
  { label: "Profile", href: "/profile", icon: User }
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-black/5 bg-white/90 px-4 py-2 backdrop-blur">
      <div className="mx-auto flex max-w-sm items-center justify-between">
        {navItems.map((item) => {
          const active = pathname === item.href
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "pressable flex min-h-[48px] flex-col items-center gap-1 rounded-2xl px-3 py-2 text-xs font-medium",
                active
                  ? "bg-highlight/15 text-highlight"
                  : "text-black/60 hover:text-text"
              )}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
