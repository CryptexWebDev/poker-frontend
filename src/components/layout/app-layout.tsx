import { Outlet } from 'react-router-dom'
import { SafeArea } from '@/components/layout/safe-area'
import { BottomTabBar } from '@/components/layout/bottom-tab-bar'

export function AppLayout() {
  return (
    <div className="app-layout-root flex flex-col overflow-hidden bg-tg-bg">
      <main className="min-h-0 flex-1 overflow-auto">
        <SafeArea className="min-h-full">
          <Outlet />
        </SafeArea>
      </main>
      <BottomTabBar />
    </div>
  )
}
