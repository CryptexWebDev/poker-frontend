import { useProfile } from '@/hooks/use-profile'
import { useAuthStore } from '@/stores/auth-store'
import { getInitData } from '@/lib/telegram'
import { UserBalanceBar } from '@/components/rooms/user-balance-bar'
import { RoomsList } from '@/components/rooms/rooms-list'
import { CreateRoomButton } from '@/components/rooms/create-room-button'

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

  return (
    <div className="p-4 flex flex-col min-h-0">
      <UserBalanceBar profile={p} className="mb-4" />
      <h1 className="text-lg font-semibold text-tg-text mb-4">Создай либо найди стол</h1>
      <div className="flex-1 min-h-0 overflow-auto">
        <RoomsList className="mb-4" />
      </div>
      <CreateRoomButton />
    </div>
  )
}
