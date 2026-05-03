import { create } from "zustand"

type UIState = {
  sosOpen: boolean
  setSOSOpen: (open: boolean) => void
}

export const useUIStore = create<UIState>((set) => ({
  sosOpen: false,
  setSOSOpen: (open) => set({ sosOpen: open })
}))
