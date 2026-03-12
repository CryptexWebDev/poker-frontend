import { Link } from 'react-router-dom'
import clsx from 'clsx'

interface CreateRoomButtonProps {
  className?: string
}

export function CreateRoomButton({ className }: CreateRoomButtonProps) {
  return (
    <Link
      to="/create"
      className={clsx(
        'block w-full rounded-2xl bg-accent py-3 px-4 text-tg-button-text font-semibold text-center',
        'hover:opacity-90 active:opacity-80',
        className
      )}
    >
      Создать свою комнату
    </Link>
  )
}
