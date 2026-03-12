import { Link } from 'react-router-dom'
import { CreateTableForm } from '@/components/create-table/create-table-form'

export function CreateGamePage() {
  return (
    <div className="p-4 flex flex-col">
      <header className="flex items-center justify-between mb-6">
        <Link
          to="/"
          className="rounded-full p-2 bg-tg-secondary text-tg-text hover:opacity-80"
        aria-label="Close"
        >
          <CloseIcon />
        </Link>
        <h1 className="text-xl font-semibold text-tg-text">Создание стола</h1>
        <span className="w-10" aria-hidden />
      </header>
      <CreateTableForm />
    </div>
  )
}

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
