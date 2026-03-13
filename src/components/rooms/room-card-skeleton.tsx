import clsx from 'clsx'

export function RoomCardSkeleton({ className }: { className?: string }) {
  return (
    <article
      className={clsx('room-card', 'room-card-skeleton', className)}
      aria-busy="true"
      aria-label="Loading room"
    >
      <div className="room-card-skeleton-title" />
      <div className="room-card-skeleton-players" />
      <div className="room-card-skeleton-btn" />
    </article>
  )
}
