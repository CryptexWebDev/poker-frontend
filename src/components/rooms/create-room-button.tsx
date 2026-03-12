import { Link } from 'react-router-dom'
import clsx from 'clsx'

interface CreateRoomButtonProps {
  className?: string
}

export function CreateRoomButton({ className }: CreateRoomButtonProps) {
  return (
    <Link
      to="/create"
      className={clsx('btn-create-room', className)}
    >
      Создать свою комнату
    </Link>
  )
}
