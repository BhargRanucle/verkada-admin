import { UserForm } from "@/components/admin-users/user-form";
import { PageTitle } from "@/components/page-title";
import { Breadcrumb } from "@/components/breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create User",
  description: "Create User",
  generator: "verkada",
};

export default function CreateUserPage() {
  const breadcrumbs = [
    { label: "User Management", href: "/admin/admin-users" },
    { label: "Create User", href: "#" },
  ];
  return (
    <div className="space-y-6">
      <Breadcrumb items={breadcrumbs} />

      <PageTitle title="Create User" />
      <div className="rounded-xl border-none bg-white p-6 shadow-none dark:bg-background [box-shadow:0_8px_34px_rgba(0,0,0,0.1)]">
        <UserForm />
      </div>
    </div>
  );
}
