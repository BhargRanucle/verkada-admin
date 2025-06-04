import { UserForm } from "@/components/admin-users/user-form"
import { PageTitle } from "@/components/page-title"

export default function CreateUserPage() {
  return (
    <div className="space-y-6">
      <PageTitle title="Create User" subtitle="Add a new user to the system" />
      <div className="rounded-xl border-none bg-white p-6 shadow-lg dark:bg-background">
        <UserForm />
      </div>
    </div>
  )
}
