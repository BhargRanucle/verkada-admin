import { UserForm } from "@/components/admin-users/user-form"
import { PageTitle } from "@/components/page-title"
import { getUserById } from "@/lib/data"

export default async function EditUserPage({ params }: { params: { id: string } }) {
  const user = await getUserById(params.id)

  return (
    <div className="space-y-6">
      <PageTitle title="Edit User" subtitle={`Editing user: ${user?.name || params.id}`} />
      <div className="rounded-xl border-none bg-white p-6 shadow-lg dark:bg-background">
        <UserForm user={user} />
      </div>
    </div>
  )
}
