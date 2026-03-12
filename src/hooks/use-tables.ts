import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchTables, createTable } from '@/lib/api'
import { useAuthStore } from '@/stores/auth-store'
import type { CreateTableBody } from '@/types/api'

export const tablesQueryKey = ['tables'] as const

export function useTablesInfinite() {
  const token = useAuthStore((s) => s.token)

  return useInfiniteQuery({
    queryKey: [...tablesQueryKey, token ?? 'none'],
    queryFn: ({ pageParam }) => fetchTables(pageParam as number),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const loaded = allPages.reduce((acc, p) => acc + p.tables.length, 0)
      return loaded < lastPage.total ? loaded : undefined
    },
    enabled: Boolean(token),
  })
}

export function useCreateTable() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (body: CreateTableBody) => createTable(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: tablesQueryKey })
    },
  })
}
