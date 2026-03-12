import { useProfile } from '@/hooks/use-profile'
import { useAuthStore } from '@/stores/auth-store'
import { getInitData } from '@/lib/telegram'
import { UserBalanceBar } from '@/components/rooms/user-balance-bar'
import { RoomsList } from '@/components/rooms/rooms-list'
import { CreateRoomButton } from '@/components/rooms/create-room-button'

export function HomePage() {
  const { data: profile, isLoading: profileLoading, error: profileError } = useProfile()
  const { isAuthLoading, authError, token, _hasHydrated } = useAuthStore()
  const hasInitData = Boolean(getInitData())
  const isKnownTelegramUser = Boolean(token)

  if (!_hasHydrated) {
    return (
      <div className="flex min-h-full flex-col items-center justify-center p-4">
        <div className="animate-pulse text-tg-hint">Загрузка...</div>
      </div>
    )
  }

  if (!hasInitData && !isKnownTelegramUser) {
    return (
      <div className="flex min-h-full flex-col items-center justify-center p-4">
        <p className="text-tg-hint text-center">Open this app from Telegram to use it.</p>
      </div>
    )
  }

  if (isAuthLoading && !profile) {
    return (
      <div className="flex min-h-full flex-col items-center justify-center p-4">
        <div className="animate-pulse text-tg-hint">Проверка авторизации...</div>
      </div>
    )
  }

  if (authError) {
    return (
      <div className="flex min-h-full flex-col items-center justify-center p-4">
        <p className="text-red-400 text-center mb-2">{authError}</p>
        <p className="text-tg-hint text-center text-sm">
          Откройте приложение снова из Telegram. Если не помогает — проверьте настройки CORS на сервере.
        </p>
      </div>
    )
  }

  if (profileLoading && !profile) {
    return (
      <div className="flex min-h-full flex-col items-center justify-center p-4">
        <div className="animate-pulse text-tg-hint">Загрузка профиля...</div>
      </div>
    )
  }

  if (profileError) {
    return (
      <div className="flex min-h-full flex-col items-center justify-center p-4">
        <p className="text-red-400 text-center">
          {profileError instanceof Error ? profileError.message : 'Ошибка загрузки'}
        </p>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="flex min-h-full flex-col items-center justify-center p-4">
        <p className="text-tg-hint text-center">Не удалось загрузить профиль.</p>
      </div>
    )
  }

  return (
    <div className="p-4 flex flex-col min-h-full">
      <UserBalanceBar profile={profile} className="mb-4" />
      <h1 className="text-lg font-semibold text-tg-text mb-4">Создай либо найди стол</h1>
      <div className="flex-1 min-h-32 overflow-auto">
        <RoomsList className="mb-4" />
      </div>
      <CreateRoomButton />
    </div>
  )
}
