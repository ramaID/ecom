import { useForm } from '@inertiajs/react'
import { useState } from 'react'
import { Button } from '~/views/components/button'
import { Dialog, DialogActions, DialogDescription, DialogTitle } from '~/views/components/dialog'
import { Strong } from '~/views/components/text'

export default function DeleteButton({ data }: { data: App.Data.AuthorData }) {
  const [isOpen, setIsOpen] = useState(false),
    { delete: destroy } = useForm(),
    confirmButtonHandler = () => {
      destroy(`/authors/${data.id}`, {
        onSuccess: () => setIsOpen(false),
      })
    }

  return (
    <>
      <Button color="red" onClick={() => setIsOpen(true)}>
        Delete
      </Button>
      <Dialog open={isOpen} onClose={setIsOpen}>
        <DialogTitle>Delete Confirmation</DialogTitle>
        <DialogDescription>
          Are you sure you want to delete author <Strong>{data.name}</Strong>?
        </DialogDescription>
        <DialogActions>
          <Button color="blue" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button color="red" onClick={() => confirmButtonHandler()}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
