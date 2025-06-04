import { Breadcrumb } from "@/components/breadcrumb";
import { Metadata } from "next";
import { PageTitle } from "@/components/page-title";
import GeneralInformationForm  from "@/components/manage-projects/form";

export const metadata: Metadata = {
  title: "Project Detail",
  description: "Project Detail",
  generator: "verkada",
};

const breadcrumbs = [
  { label: "Manage Projects", href: "/admin/manage-projects" },
  {
    label: "Project Detail",
    href: "#",
  },
];

export default async function EditPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <Breadcrumb items={breadcrumbs} />
      <PageTitle title="Project Detail" />
      <GeneralInformationForm />
    </div>
  );
}
