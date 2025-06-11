import { PageTitle } from "@/components/page-title";
import { Breadcrumb } from "@/components/breadcrumb";
import { Metadata } from "next";
import { Table } from "@/components/product-lines/table";

export const metadata: Metadata = {
  title: "Product Lines",
  description: "Product Lines",
  generator: "verkada",
};

export default function DashboardPage() {
  const breadcrumbs = [
    { label: "Product Lines", href: "/admin/product-lines" },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };
  return (
    <div className="space-y-6">
      <Breadcrumb items={breadcrumbs} />
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <PageTitle title="Product Lines" />
       
      </div>
      <Table />
    </div>
  );
}
