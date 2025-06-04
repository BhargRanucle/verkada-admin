import { Table } from "@/components/manage-projects/table";
import { PageTitle } from "@/components/page-title";
import { Breadcrumb } from "@/components/breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage Projects",
  description: "Manage Projects",
  generator: "verkada",
};

export default function UsersPage() {
  const breadcrumbs = [
    { label: "Manage Projects", href: "/admin/manage-projects" },
  ];
  return (
    <div className="space-y-6">
      <Breadcrumb items={breadcrumbs} />
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <PageTitle
          title="Manage Projects"
        />
      </div>
      <Table />
    </div>
  );
}
