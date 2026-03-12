import clsx from 'clsx'

const OPTIONS = [5, 10, 15, 20] as const

interface BetAmountSelectProps {
  value: number
  onChange: (value: number) => void
  className?: string
}

export function BetAmountSelect({ value, onChange, className }: BetAmountSelectProps) {
  const index = OPTIONS.indexOf(value as 5 | 10 | 15 | 20)
  const activeIndex = index >= 0 ? index : 0

  return (
    <div className={clsx('flex flex-col gap-2', className)}>
      <div className="flex items-center justify-between">
        <span className="text-tg-text font-medium">Сумма ставки</span>
        <span className="text-tg-text font-semibold">{value} TON</span>
      </div>
      <div className="flex gap-1 items-center" aria-hidden>
        {OPTIONS.map((_, i) => (
          <span
            key={i}
            className={clsx(
              'h-1 flex-1 rounded-full transition-colors',
              i <= activeIndex ? 'bg-accent' : 'bg-tg-hint/30'
            )}
          />
        ))}
      </div>
      <div className="flex gap-2" role="group" aria-label="Bet amount in TON">
        {OPTIONS.map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            className={clsx(
              'flex-1 rounded-xl py-2.5 flex items-center justify-center gap-1 text-tg-text font-medium transition-colors',
              value === n
                ? 'bg-accent/20 border-2 border-accent text-accent'
                : 'bg-tg-secondary border-2 border-transparent text-tg-hint hover:text-tg-text'
            )}
          >
            <span className="text-accent/80" aria-hidden>◆</span>
            {n}
          </button>
        ))}
      </div>
    </div>
  )
}
