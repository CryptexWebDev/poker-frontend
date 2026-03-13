import clsx from 'clsx'
import { TonBetIcon } from '@/components/ui/ton-bet-icon'

const OPTIONS = [5, 10, 15, 20] as const

interface BetAmountSelectProps {
  value: number
  onChange: (value: number) => void
  className?: string
}

export function BetAmountSelect({ value, onChange, className }: BetAmountSelectProps) {
  return (
    <div className={clsx('create-table-field', className)}>
      <label className="create-table-label">Сумма ставки</label>
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
