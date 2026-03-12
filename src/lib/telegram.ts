import { retrieveRawInitData, retrieveLaunchParams, isTMA } from '@tma.js/sdk'

declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        initData: string
        initDataUnsafe?: { start_param?: string }
        ready: () => void
        expand: () => void
      }
    }
  }
}

/**
 * Telegram Mini App helpers using @tma.js/sdk.
 * In components you can also use: useRawInitData(), useLaunchParams(), useThemeParams(), etc. from @tma.js/sdk-react.
 */

/**
 * Raw initData string for backend auth (POST /auth/telegram).
 * Uses @tma.js/sdk when available; fallback for dev/SSR.
 */
export function getInitData(): string {
  if (typeof window === 'undefined') return ''
  try {
    const raw = retrieveRawInitData()
    if (raw) return raw
  } catch {
    // not in TMA or SDK not ready
  }
  return window.Telegram?.WebApp?.initData ?? ''
}

/**
 * start_param from link (e.g. REF_ABC12345 for referral).
 */
export function getStartParam(): string | null {
  if (typeof window === 'undefined') return null
  try {
    const params = retrieveLaunchParams() as { start_param?: string }
    const start = params.start_param ?? null
    if (start) return start
  } catch {
    // not in TMA
  }
  const fromUrl = new URLSearchParams(window.location.search).get('tgWebAppStartParam')
  if (fromUrl) return fromUrl
  return window.Telegram?.WebApp?.initDataUnsafe?.start_param ?? null
}

/**
 * Extract referral code from start_param (REF_XXXXXXXX).
 */
export function getRefCodeFromStartParam(): string | null {
  const start = getStartParam()
  if (!start || !start.startsWith('REF_')) return null
  return start.slice(4)
}

export function isInsideTelegram(): boolean {
  if (typeof window === 'undefined') return false
  try {
    return isTMA()
  } catch {
    return Boolean(window.Telegram?.WebApp?.initData)
  }
}

export function notifyTelegramReady(): void {
  window.Telegram?.WebApp?.ready()
}

export function expandTelegram(): void {
  window.Telegram?.WebApp?.expand()
}
