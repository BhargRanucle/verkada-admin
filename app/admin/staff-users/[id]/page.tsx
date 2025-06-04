import { UserForm } from "@/components/staff-users/user-form";
import { PageTitle } from "@/components/page-title";
import { getUserById } from "@/lib/data";
import { Breadcrumb } from "@/components/breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Staff User",
  description: "Edit Staff User",
  generator: "verkada",
};

export default async function EditUserPage({
  params,
}: {
  params: { id: string };
}) {
  const user = await getUserById(params.id);
  const breadcrumbs = [
    { label: "User Management", href: "#" },
    { label: "Staff", href: "/admin/staff-users" },
    { label: "Edit User", href: "#" },
  ];
  return (
    <div className="space-y-6">
      <Breadcrumb items={breadcrumbs} />

      <PageTitle title="Edit User" />
      <div className="rounded-xl border-none bg-white p-6 shadow-lg dark:bg-background">
        <UserForm user={user} />
      </div>
    </div>
  );
}
