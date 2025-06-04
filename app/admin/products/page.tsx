import { Table } from "@/components/products/table";
import { PageTitle } from "@/components/page-title";
import { CreateButton } from "@/components/create-button";
import { Breadcrumb } from "@/components/breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
  description: "Products",
  generator: "verkada",
};

export default function UsersPage() {
  const breadcrumbs = [
    { label: "Products", href: "/admin/products" },
  ];
  return (
    <div className="space-y-6">
      <Breadcrumb items={breadcrumbs} />
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <PageTitle
          title="Products"
        />
        <CreateButton href="/admin/products/create" label="Add new product" />
      </div>
      <Table />
    </div>
  );
}
