import type { Metadata } from "next"
import type { ReactNode } from "react"
import { Manrope } from "next/font/google"
import "./globals.css"
import { Providers } from "@/components/Providers"
import { AppShell } from "@/components/AppShell"

const manrope = Manrope({ subsets: ["latin"], weight: ["400", "500", "600", "700"] })

export const metadata: Metadata = {
  title: "Maaya Care",
  description: "Pregnancy companion app"
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={manrope.className}>
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  )
}
