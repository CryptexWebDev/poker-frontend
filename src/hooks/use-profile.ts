import { useQuery } from '@tanstack/react-query'
import { fetchProfile } from '@/lib/api'
import { useAuthStore } from '@/stores/auth-store'

export const profileQueryKey = ['profile'] as const

export function useProfile() {
  const token = useAuthStore((s) => s.token)

  return useQuery({
    queryKey: [...profileQueryKey, token ?? 'none'],
    queryFn: fetchProfile,
    enabled: Boolean(token),
    staleTime: 30_000,
  })
}
