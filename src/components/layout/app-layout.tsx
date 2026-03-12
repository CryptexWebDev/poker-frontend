import { Outlet } from 'react-router-dom'
import { SafeArea } from '@/components/layout/safe-area'
import { BottomTabBar } from '@/components/layout/bottom-tab-bar'

export function AppLayout() {
  return (
    <div className="flex flex-col min-h-viewport bg-tg-bg">
      <main className="flex-1 overflow-auto">
        <SafeArea className="min-h-full">
          <Outlet />
        </SafeArea>
      </main>
      <BottomTabBar />
    </div>
  )
}
