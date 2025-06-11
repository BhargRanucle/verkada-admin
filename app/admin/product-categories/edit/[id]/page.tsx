// import { UserForm } from "@/components/admin-users/user-form"
import { ProductCategoryForm } from "@/components/product-categories/form";
import { PageTitle } from "@/components/page-title"
import { getUserById } from "@/lib/data"
import { Breadcrumb } from "@/components/breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Product Category",
  description: "Edit Product Category",
  generator: "verkada",
};

export default async function EditPage({ params }: { params: { id: string } }) {
  // const user = await getUserById(params.id);
  // console.log("params?.id", params?.id);

  const data = {
    id: "1",
    name: "Door Controllers",
    createdAt: "2023-01-15T09:24:45",
  };
  
  const breadcrumbs = [
    { label: "Product Categories", href: "/admin/product-categories" },
    { label: "Edit Product Category", href: "#" },
  ];

  return (
    <div className="space-y-6">
      <Breadcrumb items={breadcrumbs} />
      <PageTitle title="Product Category" />
      <div className="rounded-xl border-none bg-white p-6 shadow-none dark:bg-background [box-shadow:0_8px_34px_rgba(0,0,0,0.1)]">
        <ProductCategoryForm productCategory={data}  />
      </div>
    </div>
  )
}
