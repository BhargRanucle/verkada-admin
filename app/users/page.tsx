import { UsersTable } from "@/components/admin-users/users-table"
import { PageTitle } from "@/components/page-title"
import { CreateButton } from "@/components/create-button"

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <PageTitle title="Users Management" subtitle="Manage your system users" />
        <CreateButton href="/users/create" label="Add User" />
      </div>
      <UsersTable />
    </div>
  )
}
