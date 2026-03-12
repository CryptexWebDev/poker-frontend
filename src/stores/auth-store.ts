import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const TOKEN_KEY = 'poker_token'

interface AuthState {
  token: string | null
  isAuthLoading: boolean
  authError: string | null
  _hasHydrated: boolean
  setToken: (token: string | null) => void
  setAuthLoading: (loading: boolean) => void
  setAuthError: (error: string | null) => void
  setHasHydrated: (value: boolean) => void
  clear: () => void
  getToken: () => string | null
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      isAuthLoading: false,
      authError: null,
      _hasHydrated: false,
      setToken: (token) => set({ token, authError: null }),
      setAuthLoading: (isAuthLoading) => set({ isAuthLoading }),
      setAuthError: (authError) => set({ authError, isAuthLoading: false }),
      setHasHydrated: (_hasHydrated) => set({ _hasHydrated }),
      clear: () => set({ token: null, authError: null }),
      getToken: () => get().token,
    }),
    { name: TOKEN_KEY, partialize: (s) => ({ token: s.token }) }
  )
)
