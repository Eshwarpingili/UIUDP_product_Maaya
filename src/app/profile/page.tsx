"use client"

import { Card } from "@/components/Card"
import { Switch } from "@/components/ui/switch"
import { useState } from "react"
import { Moon, ShieldCheck, Share2, Link2, LogOut, Trash2, Edit2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useAppStore } from "@/store/useAppStore"
import { ConfirmDialog } from "@/components/ConfirmDialog"
import { Toast } from "@/components/Toast"

export default function ProfilePage() {
  const router = useRouter()
  const resetApp = useAppStore((state) => state.reset)
  const pregnancyData = useAppStore((state) => state.pregnancyData)

  const [darkMode, setDarkMode] = useState(false)
  const [privacy, setPrivacy] = useState(true)
  const [sharing, setSharing] = useState(true)
  const [showConfirm, setShowConfirm] = useState(false)
  const [toast, setToast] = useState(false)

  const handleLogout = () => {
    resetApp()
    router.push("/")
  }

  const handleDeleteAccount = () => {
    setShowConfirm(false)
    setToast(true)
    setTimeout(() => {
      setToast(false)
      resetApp()
      router.push("/")
    }, 1500)
  }

  return (
    <div className="space-y-6 fade-slide">
      {/* Profile Header Block */}
      <div className="flex flex-col items-center justify-center py-6 text-center relative overflow-hidden rounded-2xl bg-white shadow-card card-gradient">
        <div className="absolute top-4 right-4">
          <button className="pressable h-8 w-8 rounded-full bg-black/5 flex items-center justify-center text-black/60 hover:bg-black/10 transition-colors">
            <Edit2 size={14} />
          </button>
        </div>
        <div className="relative mb-4 mt-2">
          <div className="h-24 w-24 rounded-full overflow-hidden border-4 border-white shadow-soft bg-highlight/20 flex items-center justify-center text-highlight font-bold text-3xl">
            {pregnancyData.name.charAt(0)}
          </div>
          <div className="absolute right-1 bottom-1 h-5 w-5 rounded-full border-2 border-white bg-emerald-400"></div>
        </div>
        <h2 className="text-2xl font-bold text-text">{pregnancyData.name}</h2>
        <p className="text-sm font-medium text-highlight mt-1">{pregnancyData.pregnancyType} Pregnancy</p>
      </div>

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
        <div className="space-y-3">
          <button className="pressable w-full flex items-center justify-between p-3 rounded-2xl bg-black/5 hover:bg-black/10 transition-colors">
            <div className="flex items-center gap-3 text-sm font-semibold text-text">
              <span className="flex w-8 h-8 rounded-full bg-white items-center justify-center text-highlight shadow-sm">
                <Link2 size={16} />
              </span>
              Connect partner
            </div>
            <div className="text-xs font-semibold text-highlight bg-highlight/10 px-2 py-1 rounded-full uppercase tracking-wider">
              NEW
            </div>
          </button>
          
          <button onClick={handleLogout} className="pressable w-full flex items-center justify-between p-3 rounded-2xl bg-black/5 hover:bg-black/10 transition-colors">
            <div className="flex items-center gap-3 text-sm font-semibold text-text">
              <span className="flex w-8 h-8 rounded-full bg-white items-center justify-center text-black/60 shadow-sm">
                <LogOut size={16} />
              </span>
              Logout
            </div>
          </button>
          
          <button onClick={() => setShowConfirm(true)} className="pressable w-full flex items-center justify-between p-3 rounded-2xl bg-rose-50 hover:bg-rose-100 transition-colors mt-6 border border-rose-100">
            <div className="flex items-center gap-3 text-sm font-semibold text-rose-600">
              <span className="flex w-8 h-8 rounded-full bg-white items-center justify-center shadow-sm text-rose-500">
                <Trash2 size={16} />
              </span>
              Delete account
            </div>
          </button>
        </div>
      </Card>
      
      <ConfirmDialog
        open={showConfirm}
        title="Delete Account"
        description="This action is permanent and will remove all your data."
        confirmLabel="Delete Everything"
        onClose={() => setShowConfirm(false)}
        onConfirm={handleDeleteAccount}
      />
      <Toast message="Account deleted" open={toast} />
    </div>
  )
}
