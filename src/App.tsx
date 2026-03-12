import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider } from '@/components/app-provider'
import { AppLayout } from '@/components/layout/app-layout'
import { HomePage } from '@/pages/home-page'
import { CreateGamePage } from '@/pages/create-game-page'
import { ProfilePage } from '@/pages/profile-page'
import { TablePage } from '@/pages/table-page'
import { useTelegramAuthOnMount } from '@/hooks/use-auth'
import { notifyTelegramReady, expandTelegram } from '@/lib/telegram'

function AppContent() {
  useTelegramAuthOnMount()

  useEffect(() => {
    notifyTelegramReady()
    expandTelegram()
  }, [])

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <Routes>
        <Route path="/" element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="create" element={<CreateGamePage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="table/:id" element={<TablePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </div>
  )
}

export default function App() {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <AppProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </AppProvider>
    </div>
  )
}
