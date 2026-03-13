import clsx from 'clsx'
import { TonBetIcon } from '@/components/ui/ton-bet-icon'

const OPTIONS = [5, 10, 15, 20] as const

interface BetAmountSelectProps {
  value: number
  onChange: (value: number) => void
  className?: string
}

export function BetAmountSelect({ value, onChange, className }: BetAmountSelectProps) {
  const activeIndex = OPTIONS.indexOf(value as (typeof OPTIONS)[number])
  const filledCount = activeIndex >= 0 ? activeIndex + 1 : 1

  return (
    <div className={clsx('create-table-field', 'bet-amount-field', className)}>
      <div className="bet-amount-label-row">
        <label className="create-table-label">Сумма ставки</label>
        <span className="bet-amount-value">{value} TON</span>
      </div>
      <div className="bet-amount-indicator" aria-hidden>
        {OPTIONS.map((_, i) => (
          <span key={i} className="bet-amount-indicator-segment">
            <span
              className={clsx(
                'bet-amount-indicator-dot',
                i < filledCount && 'bet-amount-indicator-dot-filled'
              )}
            />
            {i < OPTIONS.length - 1 && (
              <span
                className={clsx(
                  'bet-amount-indicator-line',
                  i < filledCount && 'bet-amount-indicator-line-filled'
                )}
              />
            )}
          </span>
        ))}
      </div>
      <div className="bet-amount-options" role="group" aria-label="Bet amount in TON">
        {OPTIONS.map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            className={clsx(
              'bet-amount-btn',
              value === n && 'bet-amount-btn-selected'
            )}
          >
            <TonBetIcon />
            {n}
          </button>
        ))}
      </div>
    </div>
  )
}
