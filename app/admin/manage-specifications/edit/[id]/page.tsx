import { Breadcrumb } from "@/components/breadcrumb";
import { Metadata } from "next";
import FormComponent from "@/components/docx-templates/form-component";
import { PageTitle } from "@/components/page-title";

export const metadata: Metadata = {
  title: "Edit Specification",
  description: "Edit Specification",
  generator: "verkada",
};

const breadcrumbs = [
  { label: "Manage Specifications", href: "/admin/manage-specifications" },
  {
    label: "Edit Specification",
    href: "#",
  },
];

export default async function EditPage({ params }: { params: { id: string } }) {
  const specification = {
    id: "1",
    product_line: "28 10 00 Access Control 24.4",
    status: "Active",
    createdAt: "2023-01-15T09:24:45",
  };
  return (
    <div className="space-y-6">
      <Breadcrumb items={breadcrumbs} />
      <PageTitle title="Edit Specification" />
      <div className="rounded-xl border-none bg-white p-6 shadow-none dark:bg-background [box-shadow:0_8px_34px_rgba(0,0,0,0.1)]">
        <FormComponent specification={specification} />
      </div>
    </div>
  );
}
