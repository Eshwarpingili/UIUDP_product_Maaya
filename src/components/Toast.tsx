"use client"

type ToastProps = {
  message: string
  open: boolean
}

export function Toast({ message, open }: ToastProps) {
  if (!open) return null
  return (
    <div className="toast-enter fixed bottom-28 left-1/2 z-40 w-[90%] -translate-x-1/2 rounded-2xl bg-black px-4 py-3 text-center text-sm text-white shadow-soft">
      {message}
    </div>
  )
}
