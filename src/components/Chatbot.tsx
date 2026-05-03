"use client"

import { useState } from "react"
import { Send, X, BotMessageSquare } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type Message = {
  id: string
  role: "user" | "bot"
  text: string
}

const starterMessages: Message[] = [
  {
    id: "m1",
    role: "bot",
    text: "Hi, I am Maaya. Ask me anything about your pregnancy journey."
  },
  {
    id: "m2",
    role: "bot",
    text: "Need help booking an appointment or understanding a report?"
  }
]

const mockReplies = [
  "That sounds normal for this week. Keep hydrated and rest.",
  "I can help you prepare questions for your doctor.",
  "Your next milestone is coming up. Would you like reminders?",
  "Try a light walk and gentle stretching today."
]

export function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>(starterMessages)
  const [input, setInput] = useState("")
  const [typing, setTyping] = useState(false)

  const sendMessage = () => {
    if (!input.trim()) return
    const newMessage: Message = {
      id: `m-${Date.now()}`,
      role: "user",
      text: input.trim()
    }
    const reply: Message = {
      id: `b-${Date.now()}`,
      role: "bot",
      text: mockReplies[Math.floor(Math.random() * mockReplies.length)]
    }
    setMessages((prev) => [...prev, newMessage])
    setInput("")
    setTyping(true)
    setTimeout(() => {
      setMessages((prev) => [...prev, reply])
      setTyping(false)
    }, 700)
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="pressable fixed bottom-24 right-5 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-highlight to-accent-200 shadow-soft text-white"
        aria-label="Open Maaya Chat"
      >
        <BotMessageSquare size={28} />
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent open={open} className="bottom-sheet max-w-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-highlight/20 text-highlight">
                <BotMessageSquare size={24} />
              </div>
              <div>
                <div className="text-base font-semibold">Maaya</div>
                <div className="text-xs text-black/60">Your companion</div>
              </div>
            </div>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              <X size={18} />
            </Button>
          </div>
          <div className="mt-4 h-64 space-y-3 overflow-y-auto rounded-2xl bg-black/5 p-3" aria-live="polite">
            {messages.map((message) => (
              <div
                key={message.id}
                className={
                  message.role === "user"
                    ? "ml-auto w-fit max-w-[80%] rounded-2xl bg-gradient-to-r from-highlight to-accent-200 px-3 py-2 text-sm text-white shadow-soft"
                    : "w-fit max-w-[80%] rounded-2xl bg-white px-3 py-2 text-sm text-text shadow-sm"
                }
              >
                {message.text}
              </div>
            ))}
            {typing && (
              <div className="flex w-fit items-center gap-1 rounded-2xl bg-white px-3 py-2 shadow-sm">
                <span className="typing-dot bg-black/40 w-1.5 h-1.5 rounded-full inline-block animate-pulse" />
                <span className="typing-dot bg-black/40 w-1.5 h-1.5 rounded-full inline-block animate-pulse animation-delay-200" />
                <span className="typing-dot bg-black/40 w-1.5 h-1.5 rounded-full inline-block animate-pulse animation-delay-400" />
              </div>
            )}
          </div>
          <div className="mt-4 flex items-center gap-2">
            <Input
              placeholder="Type your message"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />
            <Button onClick={sendMessage}>
              <Send size={16} />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
