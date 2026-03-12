import clsx from 'clsx'

const OPTIONS = [3, 4, 5, 6] as const

interface PlayerCountSelectProps {
  value: number
  onChange: (value: number) => void
  className?: string
}

export function PlayerCountSelect({ value, onChange, className }: PlayerCountSelectProps) {
  return (
    <div className={clsx('flex flex-col gap-2', className)}>
      <span className="text-tg-text font-medium">Количество игроков</span>
      <div className="flex gap-2" role="group" aria-label="Number of players">
        {OPTIONS.map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            className={clsx(
              'flex-1 rounded-xl py-2.5 text-tg-text font-medium transition-colors',
              value === n
                ? 'bg-accent/20 border-2 border-accent text-accent'
                : 'bg-tg-secondary border-2 border-transparent text-tg-hint hover:text-tg-text'
            )}
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  )
}
