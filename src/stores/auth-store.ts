import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const TOKEN_KEY = 'poker_token'

interface AuthState {
  token: string | null
  setToken: (token: string | null) => void
  clear: () => void
  getToken: () => string | null
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      setToken: (token) => set({ token }),
      clear: () => set({ token: null }),
      getToken: () => get().token,
    }),
    { name: TOKEN_KEY }
  )
)
