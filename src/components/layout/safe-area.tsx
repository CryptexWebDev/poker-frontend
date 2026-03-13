import { ReactNode } from 'react'
import clsx from 'clsx'

interface SafeAreaProps {
  children: ReactNode
  className?: string
}

export function SafeArea({ children, className }: SafeAreaProps) {
  return (
    <div
      className={clsx('min-h-0 text-tg-text pb-safe safe-area-insets', className)}
    >
      {children}
    </div>
  )
}
