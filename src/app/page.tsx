import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/Card"

export default function WelcomePage() {
  return (
    <div className="space-y-6 fade-slide">
      <div className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-card">
        <div className="absolute app-blob one" />
        <h1 className="relative z-10 text-2xl font-semibold text-text">Welcome to Maaya Care</h1>
        <p className="relative z-10 mt-2 text-sm text-black/70">
          A pregnancy companion that keeps you informed, calm, and connected.
        </p>
      </div>
      <Card
        title="Start your journey"
        subtitle="Tell us about your role so we can personalize the experience."
      >
        <Link href="/role">
          <Button>Continue</Button>
        </Link>
      </Card>
    </div>
  )
}
