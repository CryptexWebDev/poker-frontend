import clsx from 'clsx'

interface RoomNameInputProps {
  value: string
  onChange: (value: string) => void
  error?: string
  className?: string
}

export function RoomNameInput({ value, onChange, error, className }: RoomNameInputProps) {
  return (
    <div className={clsx('flex flex-col gap-1.5', className)}>
      <label htmlFor="room-name" className="text-tg-text font-medium">
        Название комнаты
      </label>
      <input
        id="room-name"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Введите название комнаты"
        className={clsx(
          'rounded-xl border bg-tg-secondary px-4 py-3 text-tg-text placeholder:text-tg-hint',
          'focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent',
          error ? 'border-red-500' : 'border-tg-hint/30'
        )}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? 'room-name-error' : undefined}
      />
      {error && (
        <p id="room-name-error" className="text-red-400 text-sm" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
