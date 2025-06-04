import { UsersTable } from "@/components/admin-users/users-table";
import { PageTitle } from "@/components/page-title";
import { CreateButton } from "@/components/create-button";
import { Breadcrumb } from "@/components/breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Users",
  description: "Admin Users",
  generator: "verkada",
};

export default function UsersPage() {
  const breadcrumbs = [
    { label: "User Management", href: "/admin/admin-users" },
    // { label: "Admin", href: "/admin/admin-users" },
  ];
  return (
    <div className="space-y-6">
      <Breadcrumb items={breadcrumbs} />
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <PageTitle
          title="User Management"
          // subtitle="Manage your system users"
        />
        <CreateButton href="/admin/admin-users/create" label="Add User" />
      </div>
      <UsersTable />
    </div>
  );
}
