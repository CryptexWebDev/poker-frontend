import { Link } from 'react-router-dom'
import clsx from 'clsx'
import type { TableItem } from '@/types/api'

interface RoomCardProps {
  table: TableItem
  className?: string
}

export function RoomCard({ table, className }: RoomCardProps) {
  return (
    <article
      className={clsx(
        'rounded-2xl border border-accent/30 bg-tg-secondary p-4 flex items-center gap-3',
        className
      )}
      aria-label={`Room ${table.name}, ${table.players_count} of ${table.max_players} players`}
    >
      <div className="min-w-0 flex-1">
        <h3 className="text-tg-text font-semibold truncate">{table.name}</h3>
        <p className="text-tg-hint text-sm mt-0.5">
          <span aria-hidden>{table.players_count}/{table.max_players}</span>
          <span className="ml-1" aria-hidden>👤</span>
        </p>
      </div>
      <Link
        to={`/table/${table.id}`}
        className={clsx(
          'shrink-0 rounded-xl bg-accent px-4 py-2 text-tg-button-text font-medium',
          'hover:opacity-90 active:opacity-80'
        )}
      >
        Войти
      </Link>
      <span className="shrink-0 text-accent" aria-hidden title="Trophy">
        <TrophyIcon />
      </span>
    </article>
  )
}

function TrophyIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-accent">
      <path d="M6 9H4.5C3.67 9 3 8.33 3 7.5V5C3 4.17 3.67 3.5 4.5 3.5H6M18 9h1.5c.83 0 1.5-.67 1.5-1.5V5c0-.83-.67-1.5-1.5-1.5H18M6 3H18V9C18 11.76 15.76 14 13 14H11C8.24 14 6 11.76 6 9V3ZM6 14V17M18 14V17M8 21H16M12 17V21M7 14H17C17 15.66 15.66 17 14 17H10C8.34 17 7 15.66 7 14Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
