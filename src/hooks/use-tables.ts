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
      const loaded = allPages.reduce((acc, p) => acc + p.tables.length, 0)
      return loaded < lastPage.total ? loaded : undefined
    },
    refetchOnMount: 'always',
  })
}

export function useCreateTable() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (body: CreateTableBody) => createTable(body),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: tablesQueryKey })
    },
  })
}
