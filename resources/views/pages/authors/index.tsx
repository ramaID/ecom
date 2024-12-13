import { ColumnDef } from '@tanstack/react-table'
import React, { useState } from 'react'
import { useTableLogic } from '~/scripts/hooks/useTableLogic'
import { LaravelPaginate, PageProps } from '~/scripts/types'
import { GenericCount } from '~/views/components/generic/count'
import { GenericPagination } from '~/views/components/generic/pagination'
import { GenericTable } from '~/views/components/generic/table'
import { GenericTableHeader } from '~/views/components/generic/table-header'
import AuthenticatedLayout from '~/views/layouts/AuthenticatedLayout'
import DeleteButton from './delete-button'
import EditButton from './edit-button'
import AuthorForm from './form'

export default function AuthorIndexPage({ auth, items }: PageProps<{ items: LaravelPaginate<App.Data.AuthorData> }>) {
  const params = new URLSearchParams(window.location.search),
    searchKey = 'name',
    initialLimit = Number(params.get('limit') ?? '15'),
    initialSearch = String(params.get(`filter[${searchKey}]`) ?? ''),
    columns = React.useMemo<ColumnDef<App.Data.AuthorData>[]>(
      () => [
        {
          accessorKey: 'id',
          id: 'id',
        },
        {
          accessorKey: 'name',
          header: 'Nama',
        },
        {
          id: 'actions',
          header: 'Actions',
          cell: (item) => (
            <div className="flex gap-x-6">
              <EditButton
                data={{
                  id: item.cell.row.getValue('id'),
                  name: item.cell.row.getValue('name'),
                }}
              />
              <DeleteButton
                data={{
                  id: item.cell.row.getValue('id'),
                  name: item.cell.row.getValue('name'),
                }}
              />
            </div>
          ),
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
    ),
    [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  return (
    <AuthenticatedLayout user={auth.user} headerTitle="Penulis" isWithHeader={false}>
      <GenericTableHeader
        title="Penulis"
        filterSearch={filterSearch}
        limit={initialLimit}
        onLimitChange={handleLimitChange}
        onSearchChange={handleSearchChange}
        onSearchSubmit={handleSearchSubmit}
        isCreateModalOpen={isCreateModalOpen}
        setIsCreateModalOpen={setIsCreateModalOpen}
        FormComponent={AuthorForm}
        submitUrl="/authors"
      />

      <GenericCount from={items.from} to={items.to} total={items.total} itemName="penulis" />

      <GenericTable table={table} columns={columns} emptyMessage="Data penulis saat ini masih kosong." />

      <GenericPagination links={items.links} prevPageUrl={items.prev_page_url} nextPageUrl={items.next_page_url} />
    </AuthenticatedLayout>
  )
}
