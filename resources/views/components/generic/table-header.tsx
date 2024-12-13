import { MagnifyingGlassIcon } from '@heroicons/react/16/solid'
import React from 'react'
import { Button } from '~/views/components/button'
import { Dialog, DialogBody, DialogDescription, DialogTitle } from '~/views/components/dialog'
import { Heading } from '~/views/components/heading'
import { Input, InputGroup } from '~/views/components/input'
import { Select } from '~/views/components/select'

interface TableHeaderProps {
  title: string
  filterSearch: string
  limit: number
  onLimitChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSearchSubmit: () => void
  isCreateModalOpen?: boolean
  setIsCreateModalOpen?: (isOpen: boolean) => void
  FormComponent?: React.ComponentType<{
    submitUrl: string
    method: 'post' | 'put'
    setIsDialogOpen: (isOpen: boolean) => void
  }>
  submitUrl?: string
}

export const GenericTableHeader: React.FC<TableHeaderProps> = ({
  title,
  filterSearch,
  limit,
  onLimitChange,
  onSearchChange,
  onSearchSubmit,
  isCreateModalOpen,
  setIsCreateModalOpen,
  FormComponent,
  submitUrl,
}) => (
  <div className="flex flex-wrap items-end justify-between gap-4">
    <div className="max-sm:w-full sm:flex-1">
      <Heading>{title}</Heading>
      <div className="mt-4 flex max-w-xl gap-4">
        <div className="flex-1">
          <InputGroup>
            <MagnifyingGlassIcon />
            <Input
              defaultValue={filterSearch}
              placeholder={`Cari ${title.toLowerCase()} …`}
              onChange={onSearchChange}
              onBlur={onSearchSubmit}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  onSearchSubmit()
                }
              }}
            />
          </InputGroup>
        </div>
        <InputGroup>
          <Select defaultValue={limit} onChange={onLimitChange}>
            {[5, 15, 30, 60].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize} rows
              </option>
            ))}
          </Select>
        </InputGroup>
      </div>
    </div>
    {FormComponent && setIsCreateModalOpen && submitUrl && (
      <>
        <Button onClick={() => setIsCreateModalOpen(true)}>Buat {title.toLowerCase()}</Button>
        <Dialog open={isCreateModalOpen} onClose={setIsCreateModalOpen}>
          <DialogTitle>Buat {title}</DialogTitle>
          <DialogDescription>Isi formulir di bawah ini untuk membuat {title.toLowerCase()} baru.</DialogDescription>
          <DialogBody className="mt-0">
            <FormComponent submitUrl={submitUrl} method="post" setIsDialogOpen={setIsCreateModalOpen} />
          </DialogBody>
        </Dialog>
      </>
    )}
  </div>
)
