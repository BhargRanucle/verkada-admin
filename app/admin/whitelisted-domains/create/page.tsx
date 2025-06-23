import { DomainForm } from "@/components/whitelisted-domains/form";
import { PageTitle } from "@/components/page-title";
import { Breadcrumb } from "@/components/breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Whitelisted Domain",
  description: "Create Whitelisted Domain",
  generator: "verkada",
};

export default function CreatePage() {
  const breadcrumbs = [
    { label: "Whitelisted Domains", href: "/admin/whitelisted-domains" },
    { label: "Create Whitelisted Domain", href: "#" },
  ];
  return (
    <div className="space-y-6">
      <Breadcrumb items={breadcrumbs} />

      <PageTitle title="Create Whitelisted Domain" />
      <div className="rounded-xl border-none bg-white p-6 shadow-none dark:bg-background [box-shadow:0_8px_34px_rgba(0,0,0,0.1)]">
        <DomainForm />
      </div>
    </div>
  );
}
