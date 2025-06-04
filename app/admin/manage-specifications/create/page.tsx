import { Breadcrumb } from "@/components/breadcrumb";
import FormComponent from "@/components/docx-templates/form-component";
import { PageTitle } from "@/components/page-title";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create New Specification",
  description: "Create New Specification",
  generator: "verkada",
};

export default function Home() {
  const breadcrumbs = [
    { label: "Manage Specifications", href: "/admin/manage-specifications" },
    {
      label: "Create New Specification",
      href: "/admin/manage-specifications/create",
    },
  ];
  
  return (
    <div className="space-y-6">
      <Breadcrumb items={breadcrumbs} />
      <PageTitle title="Create New Specification" />
      <div className="rounded-xl border-none bg-white p-6 shadow-none dark:bg-background [box-shadow:0_8px_34px_rgba(0,0,0,0.1)]">
        <FormComponent />
      </div>
    </div>
  );
}
