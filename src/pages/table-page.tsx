import { useParams, Link } from 'react-router-dom'

export function TablePage() {
  const { id } = useParams<{ id: string }>()

  return (
    <div className="p-4 flex flex-col items-center justify-center min-h-full">
      <h1 className="text-xl font-semibold text-tg-text mb-2">Комната #{id}</h1>
      <p className="text-tg-hint text-center mb-4">
        Подключение к столу будет реализовано через WebSocket. Пока можно вернуться в лобби.
      </p>
      <Link
        to="/"
        className="rounded-xl bg-accent px-4 py-2 text-tg-button-text font-medium"
      >
        В лобби
      </Link>
    </div>
  )
}
