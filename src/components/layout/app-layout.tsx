import { useOutlet } from 'react-router-dom'
import { SafeArea } from '@/components/layout/safe-area'
import { BottomTabBar } from '@/components/layout/bottom-tab-bar'
import { ErrorBoundary } from '@/components/error-boundary'

export function AppLayout() {
  const outlet = useOutlet()

  return (
    <div className="app-layout-root">
      <main className="app-layout-main">
        <SafeArea className="app-layout-content">
          <ErrorBoundary>{outlet}</ErrorBoundary>
        </SafeArea>
      </main>
      <BottomTabBar />
    </div>
  )
}
