import { PageProps } from '~/scripts/types'
import AuthenticatedLayout from '../layouts/AuthenticatedLayout'

export default function Dashboard({ auth }: PageProps) {
  return (
    <AuthenticatedLayout user={auth.user} headerTitle="Dashboard">
      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6 text-gray-900 dark:text-gray-100">You're logged in!</div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}
