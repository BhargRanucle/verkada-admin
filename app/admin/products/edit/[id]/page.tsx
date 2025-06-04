import { ProductForm } from "@/components/products/form";
import { PageTitle } from "@/components/page-title"
import { getUserById } from "@/lib/data"
import { Breadcrumb } from "@/components/breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Product",
  description: "Edit Product",
  generator: "verkada",
};

export default async function EditPage({ params }: { params: { id: string } }) {
  // const user = await getUserById(params.id);
  // console.log("params?.id", params?.id);

  const data = {
    id: "1",
    name: "AC12 1-Door Controller by Verkada Inc",
    product_category: "Door Controllers",
    content: "AC12 1-Door Controller by Verkada Inc",
    createdAt: "2023-01-15T09:24:45",
  };
  
  const breadcrumbs = [
    { label: "Products", href: "/admin/products" },
    { label: "Edit Product", href: "#" },
  ];

  return (
    <div className="space-y-6">
      <Breadcrumb items={breadcrumbs} />
      <PageTitle title="Product" />
      <div className="rounded-xl border-none bg-white p-6 shadow-none dark:bg-background [box-shadow:0_8px_34px_rgba(0,0,0,0.1)]">
        <ProductForm product={data}  />
      </div>
    </div>
  )
}
