import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchTables, createTable } from '@/lib/api'
import type { CreateTableBody } from '@/types/api'

export const tablesQueryKey = ['tables'] as const

export function useTablesInfinite() {
  return useInfiniteQuery({
    queryKey: tablesQueryKey,
    queryFn: ({ pageParam }) => fetchTables(pageParam as number),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const loaded = allPages.reduce((acc, p) => acc + (p?.tables?.length ?? 0), 0)
      const total = lastPage?.total ?? 0
      return total > 0 && loaded < total ? loaded : undefined
    },
    retry: 0,
    refetchOnWindowFocus: false,
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
