import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

/**
 * Catches render errors in children so layout (e.g. tab bar) stays visible.
 * Use around outlet content only.
 * Fallback shows error details for debugging (copy to send to dev).
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null, errorInfo: null }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({ errorInfo })
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.error('ErrorBoundary caught:', error, errorInfo.componentStack)
    }
  }

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback
      const { error, errorInfo } = this.state
      const message = error?.message ?? 'Unknown error'
      const stack = error?.stack ?? ''
      const componentStack = errorInfo?.componentStack ?? ''

      return (
        <div className="flex min-h-[40vh] flex-col gap-4 p-4">
          <p className="text-tg-hint text-center">Something went wrong on this screen.</p>
          <div className="rounded-lg bg-tg-secondary p-3 font-mono text-xs text-tg-text overflow-auto max-h-[40vh]">
            <p className="font-semibold text-red-400 mb-1">Error:</p>
            <p className="whitespace-pre-wrap break-all">{message}</p>
            {stack && (
              <>
                <p className="font-semibold text-red-400 mt-2 mb-1">Stack:</p>
                <pre className="whitespace-pre-wrap break-all text-[0.65rem]">{stack}</pre>
              </>
            )}
            {componentStack && (
              <>
                <p className="font-semibold text-red-400 mt-2 mb-1">Component stack:</p>
                <pre className="whitespace-pre-wrap break-all text-[0.65rem]">{componentStack}</pre>
              </>
            )}
          </div>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="rounded-xl bg-accent px-4 py-2 text-tg-button-text font-medium self-center"
          >
            Reload page
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
