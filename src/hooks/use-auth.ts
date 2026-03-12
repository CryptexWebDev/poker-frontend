import { useCallback, useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { authTelegram } from '@/lib/api'
import { getInitData, getRefCodeFromStartParam } from '@/lib/telegram'
import { useAuthStore } from '@/stores/auth-store'

/**
 * Ensures user is authenticated via Telegram initData.
 * Call once at app root when inside TMA. On success sets token and invalidates profile.
 */
export function useTelegramAuth() {
  const { setToken, getToken } = useAuthStore()
  const queryClient = useQueryClient()

  const login = useCallback(async (): Promise<boolean> => {
    const initData = getInitData()
    if (!initData) return false

    const token = getToken()
    if (token) return true

    const refCode = getRefCodeFromStartParam()
    const result = await authTelegram(initData, refCode)
    setToken(result.token)
    queryClient.invalidateQueries({ queryKey: ['profile'] })
    return true
  }, [getToken, setToken, queryClient])

  return { login, isInsideTelegram: Boolean(getInitData()) }
}

/**
 * Run telegram auth on mount when initData present. Returns { isLoading, error }.
 */
export function useTelegramAuthOnMount() {
  const { login, isInsideTelegram } = useTelegramAuth()
  const queryClient = useQueryClient()

  useEffect(() => {
    if (!isInsideTelegram) return
    let cancelled = false
    login()
      .then(() => {
        if (!cancelled) queryClient.invalidateQueries({ queryKey: ['profile'] })
      })
      .catch(() => {})
    return () => { cancelled = true }
  }, [isInsideTelegram, login, queryClient])
}
