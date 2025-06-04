import { ProductCategoryForm } from "@/components/product-categories/form";
import { PageTitle } from "@/components/page-title";
import { Breadcrumb } from "@/components/breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Product Category",
  description: "Create Product Category",
  generator: "verkada",
};

export default function CreatePage() {
  const breadcrumbs = [
    { label: "Product Categories", href: "/admin/product-categories" },
    { label: "Create Product Category", href: "#" },
  ];
  return (
    <div className="space-y-6">
      <Breadcrumb items={breadcrumbs} />

      <PageTitle title="Create Product Category" />
      <div className="rounded-xl border-none bg-white p-6 shadow-none dark:bg-background w-[60%] [box-shadow:0_8px_34px_rgba(0,0,0,0.1)]">
        <ProductCategoryForm />
      </div>
    </div>
  );
}
