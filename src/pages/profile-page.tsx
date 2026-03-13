import clsx from 'clsx'
import { useProfile } from '@/hooks/use-profile'
import { useAuthStore } from '@/stores/auth-store'
import { getInitData, getTelegramUserPhotoUrl } from '@/lib/telegram'
import { TonBalanceIcon } from '@/components/ui/ton-balance-icon'
import { InvitedIcon } from '@/components/ui/invited-icon'
import { EarnedIcon } from '@/components/ui/earned-icon'
import { CopyIcon } from '@/components/ui/copy-icon'

export function ProfilePage() {
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
        <p className="text-red-400 text-center mb-2">{authError}</p>
        <p className="text-tg-hint text-center text-sm">
          Open the app from Telegram again. If it persists, the server may need to allow this
          app&apos;s domain (CORS).
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

  if (error || !profile) {
    return (
      <div className="flex min-h-full flex-col items-center justify-center p-4">
        <p className="text-tg-hint text-center">
          {error instanceof Error ? error.message : 'Could not load profile.'}
        </p>
      </div>
    )
  }

  const displayName =
    [profile.first_name, profile.last_name].filter(Boolean).join(' ') || profile.username || 'Player'
  const photoUrl = getTelegramUserPhotoUrl()

  function handleCopyCode() {
    if (profile.referral_code && navigator.clipboard) {
      navigator.clipboard.writeText(profile.referral_code)
    }
  }

  return (
    <div className="p-4 flex flex-col gap-6 pb-safe">
      {/* Header: avatar + welcome + menu */}
      <header className="profile-header">
        <div className="profile-header-user">
          <div className="profile-avatar">
            {photoUrl ? (
              <img
                src={photoUrl}
                alt=""
                className="h-full w-full object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            ) : (
              <span className="profile-avatar-fallback">
                {displayName.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          <div>
            <p className="profile-welcome">Welcome back</p>
            <p className="profile-username">{displayName}</p>
          </div>
        </div>
        <button
          type="button"
          className="profile-menu-btn"
          aria-label="Menu"
        >
          <MenuIcon />
        </button>
      </header>

      {/* Your balance block */}
      <section className="profile-block" aria-label="Your balance">
        <h2 className="profile-block-title">Your balance</h2>
        <div className="profile-balance-row">
          <TonBalanceIcon className="shrink-0" />
          <span className="profile-balance-value">{profile.balance}</span>
        </div>
        <div className="profile-balance-actions">
          <button type="button" className="profile-action-btn">
            Пополнить
          </button>
          <button type="button" className="profile-action-btn">
            Вывод
          </button>
        </div>
      </section>

      {/* Referral system */}
      <section className="profile-referral" aria-label="Referral system">
        <h2 className="profile-referral-title">Реферальная система</h2>
        <div className="profile-referral-stats">
          <div className="profile-stat-block">
            <InvitedIcon className="shrink-0" />
            <span className="profile-stat-label">Приглашено</span>
            <span className="profile-stat-value">{profile.referrals_count}</span>
          </div>
          <div className="profile-stat-block">
            <EarnedIcon className="shrink-0" />
            <span className="profile-stat-label">Заработано</span>
            <span className="profile-stat-value">${profile.referrals_earned}</span>
          </div>
        </div>
        <div className="profile-referral-code-block">
          <span className="profile-referral-code-label">Твой реферальный код</span>
          <div className="profile-referral-code-row">
            <span className="profile-referral-code">{profile.referral_code}</span>
            <button
              type="button"
              className="profile-copy-btn"
              onClick={handleCopyCode}
              aria-label="Copy referral code"
            >
              <CopyIcon />
            </button>
          </div>
        </div>
        <button type="button" className="profile-invite-btn">
          Пригласить
        </button>
      </section>
    </div>
  )
}

function MenuIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path
        d="M4 6h16M4 12h16M4 18h16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
