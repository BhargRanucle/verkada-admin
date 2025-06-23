// import { UserForm } from "@/components/admin-users/user-form"
import { DomainForm } from "@/components/whitelisted-domains/form";
import { PageTitle } from "@/components/page-title"
import { Breadcrumb } from "@/components/breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Whitelisted Domain",
  description: "Edit Whitelisted Domain",
  generator: "verkada",
};

export default async function EditPage({ params }: { params: { id: string } }) {
  const data = {
    id: "1",
    domain: "ranucle.com",
    createdAt: "2023-01-15T09:24:45",
  };
  
  const breadcrumbs = [
    { label: "Whitelisted Domains", href: "/admin/whitelisted-domains" },
    { label: "Edit Whitelisted Domain", href: "#" },
  ];

  return (
    <div className="space-y-6">
      <Breadcrumb items={breadcrumbs} />
      <PageTitle title="Whitelisted Domain" />
      <div className="rounded-xl border-none bg-white p-6 shadow-none dark:bg-background [box-shadow:0_8px_34px_rgba(0,0,0,0.1)]">
        <DomainForm domain={data}  />
      </div>
    </div>
  )
}
