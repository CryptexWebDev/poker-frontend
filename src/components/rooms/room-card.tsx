import { Link } from 'react-router-dom'
import clsx from 'clsx'
import { PlayersIcon } from '@/components/ui/players-icon'
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
        <TrophyIcon />
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

function TrophyIcon() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6 9H4.5C3.67 9 3 8.33 3 7.5V5C3 4.17 3.67 3.5 4.5 3.5H6M18 9h1.5c.83 0 1.5-.67 1.5-1.5V5c0-.83-.67-1.5-1.5-1.5H18M6 3H18V9C18 11.76 15.76 14 13 14H11C8.24 14 6 11.76 6 9V3ZM6 14V17M18 14V17M8 21H16M12 17V21M7 14H17C17 15.66 15.66 17 14 17H10C8.34 17 7 15.66 7 14Z"
        stroke="#3C65B6"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
}
