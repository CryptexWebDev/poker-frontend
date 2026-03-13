import clsx from 'clsx'
import { getTelegramUserPhotoUrl } from '@/lib/telegram'
import type { Profile } from '@/types/api'

interface UserBalanceBarProps {
  profile: Profile
  className?: string
}

export function UserBalanceBar({ profile, className }: UserBalanceBarProps) {
  const displayName = [profile.first_name, profile.last_name].filter(Boolean).join(' ') || profile.username || 'Player'
  const balance = profile.balance
  const photoUrl = getTelegramUserPhotoUrl()

  return (
    <div
      className={clsx('flex items-center gap-3 py-2', className)}
      aria-label={`User ${displayName}, balance ${balance} TON`}
    >
      <div
        className="h-10 w-10 rounded-full bg-tg-secondary flex items-center justify-center text-tg-text font-semibold shrink-0 overflow-hidden"
        aria-hidden
      >
        {photoUrl ? (
          <img
            src={photoUrl}
            alt=""
            className="h-full w-full object-cover"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        ) : (
          displayName.charAt(0).toUpperCase()
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-tg-text font-medium truncate">{displayName}</p>
        <p className="text-tg-hint text-sm flex items-center gap-1 flex-wrap">
          <span>{balance}</span>
          <span className="text-accent">TON</span>
          <span className="text-tg-hint text-xs">· ID {profile.telegram_id}</span>
          <span className="text-accent ml-1" aria-hidden>+</span>
        </p>
      </div>
    </div>
  )
}
