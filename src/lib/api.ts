import { env } from '@/env'
import { useAuthStore } from '@/stores/auth-store'
import type { AuthResponse, Profile, TableItem, TablesListResponse, CreateTableBody } from '@/types/api'

const baseUrl = env.apiUrl

function getAuthHeaders(): HeadersInit {
  const token = useAuthStore.getState().getToken()
  const headers: HeadersInit = { 'Content-Type': 'application/json' }
  if (token) headers['Authorization'] = `Bearer ${token}`
  return headers
}

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const text = await res.text()
    let message = res.statusText
    try {
      const json = JSON.parse(text)
      if (json.detail) message = typeof json.detail === 'string' ? json.detail : json.detail[0]?.msg ?? message
    } catch {
      if (text) message = text.slice(0, 200)
    }
    throw new Error(message)
  }
  if (res.status === 204) return undefined as T
  return res.json() as Promise<T>
}

export async function authTelegram(initData: string, refCode: string | null): Promise<AuthResponse> {
  const res = await fetch(`${baseUrl}/auth/telegram`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ init_data: initData, ref_code: refCode || undefined }),
  })
  return handleResponse<AuthResponse>(res)
}

export async function fetchProfile(): Promise<Profile> {
  const res = await fetch(`${baseUrl}/me`, { headers: getAuthHeaders() })
  return handleResponse<Profile>(res)
}

const TABLES_PAGE_SIZE = 20
const FETCH_TABLES_TIMEOUT_MS = 12_000

export async function fetchTables(offset: number): Promise<TablesListResponse> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), FETCH_TABLES_TIMEOUT_MS)
  try {
    const res = await fetch(
      `${baseUrl}/tables?limit=${TABLES_PAGE_SIZE}&offset=${offset}`,
      { headers: getAuthHeaders(), signal: controller.signal }
    )
    return handleResponse<TablesListResponse>(res)
  } catch (err) {
    if (err instanceof Error && err.name === 'AbortError') {
      throw new Error('Таймаут загрузки комнат. Проверьте интернет.')
    }
    throw err
  } finally {
    clearTimeout(timeoutId)
  }
}

export async function createTable(body: CreateTableBody): Promise<TableItem> {
  const res = await fetch(`${baseUrl}/tables`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(body),
  })
  return handleResponse<TableItem>(res)
}
