import clsx from 'clsx'
import { getTelegramUserPhotoUrl } from '@/lib/telegram'
import { TonIcon } from '@/components/ui/ton-icon'
import { PlusIcon } from '@/components/ui/plus-icon'
import type { Profile } from '@/types/api'

interface UserBalanceBarProps {
  profile: Profile
  className?: string
}

export function UserBalanceBar({ profile, className }: UserBalanceBarProps) {
  const displayName =
    [profile.first_name, profile.last_name].filter(Boolean).join(' ') || profile.username || 'Player'
  const balance = profile.balance
  const photoUrl = getTelegramUserPhotoUrl()

  return (
    <div
      className={clsx('flex items-center gap-3', className)}
      aria-label={`User ${displayName}, balance ${balance} TON`}
    >
      {/* Avatar 42x42 */}
      <div
        className="user-balance-bar-avatar"
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
          <span className="user-balance-bar-avatar-fallback">
            {displayName.charAt(0).toUpperCase()}
          </span>
        )}
      </div>

      {/* Name */}
      <p className="user-balance-bar-name min-w-0 flex-1 truncate">{displayName}</p>

      {/* Balance block */}
      <div className="user-balance-bar-balance">
        <span className="user-balance-bar-balance-text">{balance}</span>
        <TonIcon className="shrink-0" />
        <button
          type="button"
          className="user-balance-bar-add-btn"
          aria-label="Add balance"
        >
          <PlusIcon />
        </button>
      </div>
    </div>
  )
}
