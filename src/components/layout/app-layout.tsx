import { useOutlet } from 'react-router-dom'
import { SafeArea } from '@/components/layout/safe-area'
import { BottomTabBar } from '@/components/layout/bottom-tab-bar'
import { ErrorBoundary } from '@/components/error-boundary'

export function AppLayout() {
  const outlet = useOutlet()

  return (
    <div className="app-layout-root flex flex-col overflow-hidden bg-tg-bg">
      <main className="min-h-0 flex-1 flex flex-col overflow-auto">
        <SafeArea className="min-h-full flex-1 flex flex-col">
          <div className="flex-1 flex flex-col min-h-full">
            <ErrorBoundary>{outlet}</ErrorBoundary>
          </div>
        </SafeArea>
      </main>
      <BottomTabBar />
    </div>
  )
}
