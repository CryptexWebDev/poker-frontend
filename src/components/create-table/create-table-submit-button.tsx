import clsx from 'clsx'

interface CreateTableSubmitButtonProps {
  isPending: boolean
  className?: string
}

export function CreateTableSubmitButton({ isPending, className }: CreateTableSubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={isPending}
      className={clsx('btn-create-room', className)}
    >
      {isPending ? 'Создание...' : 'Создать свою комнату'}
    </button>
  )
}

