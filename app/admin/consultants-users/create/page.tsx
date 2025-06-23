import { UserForm } from "@/components/admin-users/user-form";
import { PageTitle } from "@/components/page-title";
import { Breadcrumb } from "@/components/breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Consultants",
  description: "Create Consultants",
  generator: "verkada",
};

export default function CreateUserPage() {
  const breadcrumbs = [
    { label: "User Management", href: "/admin/consultants-users" },
    { label: "Create Consultants", href: "#" },
  ];
  return (
    <div className="space-y-6">
      <Breadcrumb items={breadcrumbs} />

      <PageTitle title="Create Consultants" />
      <div className="rounded-xl border-none bg-white p-6 shadow-none dark:bg-background [box-shadow:0_8px_34px_rgba(0,0,0,0.1)]">
        <UserForm />
      </div>
    </div>
  );
}
