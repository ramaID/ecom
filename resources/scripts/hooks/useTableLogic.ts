import { router } from '@inertiajs/react'
import { ColumnDef, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useCallback, useMemo, useState } from 'react'
import { updateSearchParams } from '../utils'

export function useTableLogic<T>(
  items: { data: T[]; total: number },
  columns: ColumnDef<T>[],
  searchKey: string,
  initialLimit: number,
  initialSearch: string,
  columnVisibility?: Record<string, boolean>
) {
  const [filterSearch, setFilterSearch] = useState(initialSearch),
    data = useMemo(() => items.data, [items.data]),
    table = useReactTable<T>({
      columns,
      data,
      getCoreRowModel: getCoreRowModel(),
      manualPagination: true,
      rowCount: items.total,
      state: {
        columnVisibility,
      },
    }),
    handleLimitChange = useCallback(
      (e: React.ChangeEvent<HTMLSelectElement>) => {
        const queryString = updateSearchParams(window.location, {
          limit: e.target.value,
          page: '1',
          'filter[name]': filterSearch,
        })
        router.visit(window.location.pathname + '?' + queryString)
      },
      [filterSearch]
    ),
    handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      setFilterSearch(e.target.value)
    }, []),
    handleSearchSubmit = useCallback(() => {
      const queryString = updateSearchParams(window.location, {
        limit: initialLimit.toString(),
        page: '1',
        [`filter[${searchKey}]`]: filterSearch,
      })
      router.visit(window.location.pathname + '?' + queryString)
    }, [filterSearch, initialLimit])

  return {
    table,
    filterSearch,
    handleLimitChange,
    handleSearchChange,
    handleSearchSubmit,
  }
}
