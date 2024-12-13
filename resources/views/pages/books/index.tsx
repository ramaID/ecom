import { ColumnDef } from '@tanstack/react-table'
import React, { useState } from 'react'
import { useTableLogic } from '~/scripts/hooks/useTableLogic'
import { LaravelPaginate, PageProps } from '~/scripts/types'
import { GenericCount } from '~/views/components/generic/count'
import { GenericPagination } from '~/views/components/generic/pagination'
import { GenericTable } from '~/views/components/generic/table'
import { GenericTableHeader } from '~/views/components/generic/table-header'
import AuthenticatedLayout from '~/views/layouts/AuthenticatedLayout'

export default function BookIndexPage({ auth, items }: PageProps<{ items: LaravelPaginate<App.Data.BookData> }>) {
  const params = new URLSearchParams(window.location.search),
    searchKey = 'title',
    initialLimit = Number(params.get('limit') ?? 15),
    initialSearch = params.get(`filter[${searchKey}]`) ?? '',
    columns = React.useMemo<ColumnDef<App.Data.BookData>[]>(
      () => [
        {
          accessorKey: 'id',
          id: 'id',
        },
        {
          accessorKey: 'year',
          header: 'Tahun',
        },
        {
          accessorKey: 'title',
          header: 'Judul',
        },
      ],
      []
    ),
    [columnVisibility] = useState({
      id: false,
      name: true,
      actions: true,
    }),
    { table, filterSearch, handleLimitChange, handleSearchChange, handleSearchSubmit } = useTableLogic(
      items,
      columns,
      searchKey,
      initialLimit,
      initialSearch,
      columnVisibility
    )

  return (
    <AuthenticatedLayout user={auth.user} headerTitle="Buku" isWithHeader={false}>
      <GenericTableHeader
        title="Buku"
        filterSearch={filterSearch}
        limit={initialLimit}
        onLimitChange={handleLimitChange}
        onSearchChange={handleSearchChange}
        onSearchSubmit={handleSearchSubmit}
        submitUrl="/books"
      />

      <GenericCount from={items.from} to={items.to} total={items.total} itemName="buku" />

      <GenericTable table={table} columns={columns} emptyMessage="Data buku saat ini masih kosong." />

      <GenericPagination links={items.links} prevPageUrl={items.prev_page_url} nextPageUrl={items.next_page_url} />
    </AuthenticatedLayout>
  )
}
