import { useForm } from '@inertiajs/react'
import { ChangeEvent, FormEvent } from 'react'
import { Button } from '~/views/components/button'
import { Divider } from '~/views/components/divider'
import { ErrorMessage, Field, Label } from '~/views/components/fieldset'
import { Input } from '~/views/components/input'

interface AuthorFormProps {
  initialData?: {
    name: string
  }
  submitUrl: string
  method: 'post' | 'put'
  setIsDialogOpen: (value: boolean) => void
}

export default function AuthorForm({ initialData, submitUrl, method, setIsDialogOpen }: AuthorFormProps) {
  const { data, setData, post, put, processing, errors, clearErrors } = useForm({
    name: initialData?.name || '',
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    let requestOptions = {
      onSuccess: () => setIsDialogOpen(false),
    }

    method === 'post' ? post(submitUrl, requestOptions) : put(submitUrl, requestOptions)
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    setData(name as any, value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Field>
        <Label>Nama</Label>
        <Input
          defaultValue={data.name}
          name="name"
          onChange={(e) => handleInputChange(e)}
          invalid={errors.name !== undefined}
          required
          autoFocus
        />
        {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
      </Field>

      <Divider className="my-10" soft />

      <div className="flex justify-end gap-4">
        <Button
          type="reset"
          plain
          disabled={processing}
          onClick={() => {
            clearErrors()
            setData('name', initialData?.name || '')
          }}
        >
          Reset
        </Button>
        <Button type="submit" disabled={processing}>
          {processing ? 'Menyimpan...' : 'Simpan'}
        </Button>
      </div>
    </form>
  )
}
