import clsx from 'clsx'

const OPTIONS = [3, 4, 5, 6] as const

interface PlayerCountSelectProps {
  value: number
  onChange: (value: number) => void
  className?: string
}

export function PlayerCountSelect({ value, onChange, className }: PlayerCountSelectProps) {
  return (
    <div className={clsx('create-table-field', className)}>
      <label className="create-table-label">Количество игроков</label>
      <div className="player-count-options" role="group" aria-label="Number of players">
        {OPTIONS.map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            className={clsx(
              'player-count-btn',
              value === n && 'player-count-btn-selected'
            )}
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  )
}
