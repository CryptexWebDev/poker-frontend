import { useRef, useEffect } from 'react'
import { useTablesInfinite } from '@/hooks/use-tables'
import { RoomCard } from './room-card'
import clsx from 'clsx'

export function RoomsList({ className }: { className?: string }) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error } = useTablesInfinite()
  const sentinelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return
    const el = sentinelRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) fetchNextPage()
      },
      { rootMargin: '200px', threshold: 0 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  if (error) {
    return (
      <div className={clsx('p-4 text-red-400 text-center', className)}>
        {error instanceof Error ? error.message : 'Не удалось загрузить комнаты'}
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className={clsx('p-4 text-center', className)}>
        <span className="inline-block animate-pulse text-accent font-medium">Загрузка комнат...</span>
      </div>
    )
  }

  const tables = data?.pages.flatMap((p) => p.tables) ?? []

  return (
    <div className={clsx('flex flex-col gap-3', className)}>
      {tables.length === 0 ? (
        <p className="text-tg-hint text-center py-6">Пока нет комнат. Создайте первую.</p>
      ) : (
        <>
          {tables.map((table) => (
            <RoomCard key={table.id} table={table} />
          ))}
          <div ref={sentinelRef} aria-hidden className="h-2 shrink-0" />
          {isFetchingNextPage && (
            <p className="text-tg-hint text-center py-2 text-sm">Загрузка...</p>
          )}
        </>
      )}
    </div>
  )
}
