import { Table } from "@/components/whitelisted-domains/table";
import { PageTitle } from "@/components/page-title";
import { CreateButton } from "@/components/create-button";
import { Breadcrumb } from "@/components/breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Whitelisted Domains",
  description: "Whitelisted Domains",
  generator: "verkada",
};

export default function UsersPage() {
  const breadcrumbs = [
    { label: "Whitelisted Domains", href: "/admin/whitelisted-domains" },
  ];
  return (
    <div className="space-y-6">
      <Breadcrumb items={breadcrumbs} />
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <PageTitle
          title="Whitelisted Domains"
        />
        <CreateButton href="/admin/whitelisted-domains/create" label="Add Whitelisted Domain" />
      </div>
      <Table />
    </div>
  );
}
