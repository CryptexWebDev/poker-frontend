import { useEffect } from 'react'
import { AppProvider } from '@/components/app-provider'
import { HomePage } from '@/pages/home-page'
import { useTelegramAuthOnMount } from '@/hooks/use-auth'
import { notifyTelegramReady, expandTelegram } from '@/lib/telegram'

function AppContent() {
  useTelegramAuthOnMount()

  useEffect(() => {
    notifyTelegramReady()
    expandTelegram()
  }, [])

  return <HomePage />
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  )
}
