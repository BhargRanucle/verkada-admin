import { UserForm } from "@/components/consultant-users/user-form";
import { PageTitle } from "@/components/page-title";
import { getUserById } from "@/lib/data";
import { Breadcrumb } from "@/components/breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Consultant",
  description: "Edit Consultant",
  generator: "verkada",
};

export default async function EditUserPage({
  params,
}: {
  params: { id: string };
}) {
  // console.log("params", params);
  // const user = await getUserById(params.id);
  const data = {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    is_verifird: true,
    company_name: "Ranucle",
    avatar: "",
    createdAt: "2023-01-15T09:24:45",
  };
  const breadcrumbs = [
    { label: "Consultants", href: "/admin/consultants-users" },
    { label: "Edit Consultant", href: "#" },
  ];

  return (
    <div className="space-y-6">
      <Breadcrumb items={breadcrumbs} />
      <PageTitle title="Edit Consultant" />
      <div className="rounded-xl border-none bg-white p-6 shadow-none dark:bg-background [box-shadow:0_8px_34px_rgba(0,0,0,0.1)]">
        <UserForm user={data} />
      </div>
    </div>
  );
}
