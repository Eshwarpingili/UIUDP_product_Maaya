"use client"

import { Card } from "@/components/Card"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Moon, ShieldCheck, Share2, Link2, LogOut, Trash2 } from "lucide-react"

export default function ProfilePage() {
  const [darkMode, setDarkMode] = useState(false)
  const [privacy, setPrivacy] = useState(true)
  const [sharing, setSharing] = useState(true)

  return (
    <div className="space-y-6 fade-slide">
      <Card title="Preferences" subtitle="Customize your experience.">
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-2xl bg-black/5 p-3">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white">
                <Moon size={18} />
              </span>
              <div>
                <div className="text-sm font-medium">Dark mode</div>
                <div className="text-xs text-black/60">Theme preference (demo).</div>
              </div>
            </div>
            <Switch checked={darkMode} onCheckedChange={setDarkMode} />
          </div>
          <div className="flex items-center justify-between rounded-2xl bg-black/5 p-3">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white">
                <ShieldCheck size={18} />
              </span>
              <div>
                <div className="text-sm font-medium">Privacy mode</div>
                <div className="text-xs text-black/60">Hide sensitive summaries.</div>
              </div>
            </div>
            <Switch checked={privacy} onCheckedChange={setPrivacy} />
          </div>
          <div className="flex items-center justify-between rounded-2xl bg-black/5 p-3">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white">
                <Share2 size={18} />
              </span>
              <div>
                <div className="text-sm font-medium">Share with partner</div>
                <div className="text-xs text-black/60">Allow shared dashboard access.</div>
              </div>
            </div>
            <Switch checked={sharing} onCheckedChange={setSharing} />
          </div>
        </div>
      </Card>
      <Card title="Account actions" subtitle="Manage account safely.">
        <div className="flex flex-wrap gap-3">
          <Button variant="secondary">
            <Link2 size={16} /> Connect partner
          </Button>
          <Button variant="outline">
            <LogOut size={16} /> Logout
          </Button>
          <Button variant="ghost">
            <Trash2 size={16} /> Delete account
          </Button>
        </div>
      </Card>
    </div>
  )
}
