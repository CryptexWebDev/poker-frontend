declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        initData: string
        initDataUnsafe?: { start_param?: string }
        ready: () => void
        expand: () => void
        close: () => void
      }
    }
  }
}

const TG = typeof window !== 'undefined' ? window.Telegram?.WebApp : undefined

/**
 * Raw initData string for backend auth (POST /auth/telegram).
 * Empty when not in Telegram Mini App context.
 */
export function getInitData(): string {
  return TG?.initData ?? ''
}

/**
 * start_param from link (e.g. REF_ABC12345 for referral).
 * From tgWebAppStartParam or initDataUnsafe.start_param.
 */
export function getStartParam(): string | null {
  if (typeof window === 'undefined') return null
  const params = new URLSearchParams(window.location.search)
  const fromUrl = params.get('tgWebAppStartParam')
  if (fromUrl) return fromUrl
  return TG?.initDataUnsafe?.start_param ?? null
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
  return Boolean(TG?.initData)
}

export function notifyTelegramReady(): void {
  TG?.ready()
}

export function expandTelegram(): void {
  TG?.expand()
}
