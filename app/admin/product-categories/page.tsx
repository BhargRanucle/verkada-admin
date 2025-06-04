import { Table } from "@/components/product-categories/table";
import { PageTitle } from "@/components/page-title";
import { CreateButton } from "@/components/create-button";
import { Breadcrumb } from "@/components/breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product Categories",
  description: "Product Categories",
  generator: "verkada",
};

export default function UsersPage() {
  const breadcrumbs = [
    { label: "Product Categories", href: "/admin/product-categories" },
    // { label: "Admin", href: "/admin/product-categories" },
  ];
  return (
    <div className="space-y-6">
      <Breadcrumb items={breadcrumbs} />
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <PageTitle
          title="Product Categories"
          // subtitle="Manage your system users"
        />
        <CreateButton href="/admin/product-categories/create" label="Add Product Category" />
      </div>
      <Table />
    </div>
  );
}
