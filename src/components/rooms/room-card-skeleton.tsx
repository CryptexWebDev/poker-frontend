import { forwardRef } from 'react'
import clsx from 'clsx'
import { TrophyCupIcon } from '@/components/ui/trophy-cup-icon'

export const RoomCardSkeleton = forwardRef<HTMLElement, { className?: string }>(
  function RoomCardSkeleton({ className }, ref) {
    return (
      <article
        ref={ref}
        className={clsx('room-card', 'room-card-skeleton', className)}
        aria-busy="true"
        aria-label="Loading room"
      >
      <span className="room-card-trophy" aria-hidden>
        <TrophyCupIcon />
      </span>
      <div className="room-card-skeleton-title" />
      <div className="room-card-skeleton-players" />
      <div className="room-card-skeleton-btn" />
    </article>
  )
  }
)
