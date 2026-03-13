import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RoomNameInput } from './room-name-input'
import { PlayerCountSelect } from './player-count-select'
import { BetAmountSelect } from './bet-amount-select'
import { CreateTableSubmitButton } from './create-table-submit-button'
import { useCreateTable } from '@/hooks/use-tables'
import clsx from 'clsx'

export function CreateTableForm({ className }: { className?: string }) {
  const navigate = useNavigate()
  const createTable = useCreateTable()
  const [name, setName] = useState('')
  const [maxPlayers, setMaxPlayers] = useState(3)
  const [buyIn, setBuyIn] = useState(5)
  const [nameError, setNameError] = useState<string | null>(null)

  function validate(): boolean {
    const trimmed = name.trim()
    if (!trimmed) {
      setNameError('Введите название комнаты')
      return false
    }
    if (trimmed.length > 64) {
      setNameError('Не более 64 символов')
      return false
    }
    setNameError(null)
    return true
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate() || createTable.isPending) return
    createTable.mutate(
      { name: name.trim(), max_players: maxPlayers, buy_in: buyIn },
      {
        onSuccess: (table) => {
          navigate(`/table/${table.id}`)
        },
      }
    )
  }

  return (
    <form onSubmit={handleSubmit} className={clsx('flex flex-col gap-6', className)} noValidate>
      <RoomNameInput
        value={name}
        onChange={(v) => { setName(v); setNameError(null) }}
        error={nameError ?? undefined}
      />
      <PlayerCountSelect value={maxPlayers} onChange={setMaxPlayers} />
      <BetAmountSelect value={buyIn} onChange={setBuyIn} />
      <CreateTableSubmitButton isPending={createTable.isPending} />
      {createTable.error && (
        <p className="text-red-400 text-sm text-center" role="alert">
          {createTable.error.message}
        </p>
      )}
    </form>
  )
}
