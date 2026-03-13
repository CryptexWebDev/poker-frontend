import { Link } from 'react-router-dom'
import clsx from 'clsx'
import { PlayersIcon } from '@/components/ui/players-icon'
import { TrophyCupIcon } from '@/components/ui/trophy-cup-icon'
import type { TableItem } from '@/types/api'

interface RoomCardProps {
  table: TableItem
  className?: string
}

export function RoomCard({ table, className }: RoomCardProps) {
  return (
    <article
      className={clsx('room-card', className)}
      aria-label={`Room ${table.name}, ${table.players_count} of ${table.max_players} players`}
    >
      <span className="room-card-trophy" aria-hidden>
        <TrophyCupIcon />
      </span>
      <h3 className="room-card-title truncate">{table.name}</h3>
      <div className="room-card-players">
        <span aria-hidden>
          {table.players_count}/{table.max_players}
        </span>
        <PlayersIcon className="shrink-0" />
      </div>
      <Link to={`/table/${table.id}`} className="btn-join self-start">
        Войти
      </Link>
    </article>
  )
}
