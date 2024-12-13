import { useState } from 'react'
import { Button } from '~/views/components/button'
import { Dialog, DialogBody, DialogDescription, DialogTitle } from '~/views/components/dialog'
import AuthorForm from './form'

export default function EditButton({ data }: { data: App.Data.AuthorData }) {
  let [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button color="blue" onClick={() => setIsOpen(true)}>
        Edit
      </Button>
      <Dialog open={isOpen} onClose={setIsOpen}>
        <DialogTitle>Edit Penulis</DialogTitle>
        <DialogDescription>Ubah data penulis {data.name}</DialogDescription>
        <DialogBody>
          <AuthorForm submitUrl={`/authors/${data.id}`} method="put" setIsDialogOpen={setIsOpen} initialData={data} />
        </DialogBody>
      </Dialog>
    </>
  )
}
