import { useOutlet } from 'react-router-dom'
import { SafeArea } from '@/components/layout/safe-area'
import { BottomTabBar } from '@/components/layout/bottom-tab-bar'
import { ErrorBoundary } from '@/components/error-boundary'

export function AppLayout() {
  const outlet = useOutlet()

  return (
    <div className="app-layout-root flex flex-col overflow-hidden">
      <main className="min-h-0 flex-1 flex flex-col overflow-auto">
        <SafeArea className="flex flex-col min-h-full min-h-viewport">
          <div className="flex flex-col min-h-0">
            <ErrorBoundary>{outlet}</ErrorBoundary>
          </div>
        </SafeArea>
      </main>
      <BottomTabBar />
    </div>
  )
}
