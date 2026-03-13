import clsx from 'clsx'

interface RoomNameInputProps {
  value: string
  onChange: (value: string) => void
  error?: string
  className?: string
}

export function RoomNameInput({ value, onChange, error, className }: RoomNameInputProps) {
  return (
    <div className={clsx('create-table-field', className)}>
      <label htmlFor="room-name" className="create-table-label">
        Название комнаты
      </label>
      <input
        id="room-name"
        type="text"
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Введите название комнаты"
        className="create-table-input"
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
