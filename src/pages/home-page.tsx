import clsx from 'clsx'
import { useProfile } from '@/hooks/use-profile'
import { useAuthStore } from '@/stores/auth-store'
import { getInitData } from '@/lib/telegram'

export function HomePage() {
  const { data: profile, isLoading, error } = useProfile()
  const { isAuthLoading, authError } = useAuthStore()
  const hasInitData = Boolean(getInitData())

  if (!hasInitData) {
    return (
      <div className="flex min-h-full flex-col items-center justify-center p-4">
        <p className="text-tg-hint text-center">Open this app from Telegram to use it.</p>
      </div>
    )
  }

  if (isAuthLoading && !profile) {
    return (
      <div className="flex min-h-full flex-col items-center justify-center p-4">
        <div className="animate-pulse text-tg-hint">Checking authorization...</div>
      </div>
    )
  }

  if (authError) {
    return (
      <div className="flex min-h-full flex-col items-center justify-center p-4">
        <p className="text-red-400 text-center mb-2">
          {authError}
        </p>
        <p className="text-tg-hint text-center text-sm">
          Open the app from Telegram again. If it persists, the server may need to allow this app&apos;s domain (CORS).
        </p>
      </div>
    )
  }

  if (isLoading && !profile) {
    return (
      <div className="flex min-h-full flex-col items-center justify-center p-4">
        <div className="animate-pulse text-tg-hint">Loading...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-full flex-col items-center justify-center p-4">
        <p className="text-red-400 text-center">
          {error instanceof Error ? error.message : 'Something went wrong'}
        </p>
      </div>
    )
  }

  const p = profile
  if (!p && !isLoading) {
    return (
      <div className="flex min-h-full flex-col items-center justify-center p-4">
        <p className="text-tg-hint text-center">Could not load profile.</p>
      </div>
    )
  }

  if (!p) return null

  const displayName = [p.first_name, p.last_name].filter(Boolean).join(' ') || p.username || 'Player'

  return (
    <div className="p-4">
      <header className="mb-6">
        <h1 className="text-xl font-semibold text-tg-text">Poker</h1>
      </header>

      <section
        className={clsx(
          'rounded-2xl p-4 mb-4',
          'bg-tg-secondary'
        )}
        aria-label="User info"
      >
        <h2 className="text-tg-hint text-sm font-medium mb-2">Profile</h2>
        <p className="text-tg-text font-medium">{displayName}</p>
        {p.username && (
          <p className="text-tg-hint text-sm">@{p.username}</p>
        )}
      </section>

      <section
        className={clsx(
          'rounded-2xl p-4',
          'bg-tg-secondary'
        )}
        aria-label="Balance"
      >
        <h2 className="text-tg-hint text-sm font-medium mb-1">Balance</h2>
        <p className="text-2xl font-bold text-tg-text">{p.balance} TON</p>
      </section>
    </div>
  )
}
