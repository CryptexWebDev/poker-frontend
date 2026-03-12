import { env } from '@/env'
import { useAuthStore } from '@/stores/auth-store'
import type { AuthResponse, Profile } from '@/types/api'

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
