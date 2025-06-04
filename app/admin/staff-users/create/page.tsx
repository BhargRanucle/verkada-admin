import { UserForm } from "@/components/staff-users/user-form";
import { PageTitle } from "@/components/page-title";
import { Breadcrumb } from "@/components/breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Staff User",
  description: "Create Staff User",
  generator: "verkada",
};

export default function CreateUserPage() {
  const breadcrumbs = [
    { label: "User Management", href: "#" },
    { label: "Staff", href: "/admin/staff-users" },
    { label: "Create User", href: "#" },
  ];
  return (
    <div className="space-y-6">
      <Breadcrumb items={breadcrumbs} />
      <PageTitle title="Create User" />
      <div className="rounded-xl border-none bg-white p-6 shadow-lg dark:bg-background">
        <UserForm />
      </div>
    </div>
  );
}
