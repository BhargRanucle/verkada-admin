import { UsersTable } from "@/components/consultant-users/users-table";
import { PageTitle } from "@/components/page-title";
import { CreateButton } from "@/components/create-button";
import { Breadcrumb } from "@/components/breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Consultants Users",
  description: "Consultants Users",
  generator: "verkada",
};

export default function UsersPage() {
  const breadcrumbs = [
    { label: "Consultants Users", href: "/admin/consultants-users" },
  ];
  return (
    <div className="space-y-6">
      <Breadcrumb items={breadcrumbs} />
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <PageTitle
          title="Consultants Users"
        />
        {/* <CreateButton href="/admin/admin-users/create" label="Add User" /> */}
      </div>
      <UsersTable />
    </div>
  );
}
