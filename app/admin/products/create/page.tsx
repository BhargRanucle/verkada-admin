import { ProductForm } from "@/components/products/form";
import { PageTitle } from "@/components/page-title";
import { Breadcrumb } from "@/components/breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Product",
  description: "Create Product",
  generator: "verkada",
};

export default function CreatePage() {
  const breadcrumbs = [
    { label: "Products", href: "/admin/products" },
    { label: "Create Product", href: "#" },
  ];
  return (
    <div className="space-y-6">
      <Breadcrumb items={breadcrumbs} />

      <PageTitle title="Create Product" />
      <div className="rounded-xl border-none bg-white p-6 shadow-none dark:bg-background [box-shadow:0_8px_34px_rgba(0,0,0,0.1)]">
        <ProductForm />
      </div>
    </div>
  );
}
