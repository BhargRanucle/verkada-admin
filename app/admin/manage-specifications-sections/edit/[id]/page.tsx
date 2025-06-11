"use client";

import { Breadcrumb } from "@/components/breadcrumb";
import { Metadata } from "next";
import FormComponent from "@/components/manage-specifications-sections/form-component";
import { PageTitle } from "@/components/page-title";
import { useEffect, useState } from "react";
import axios from "axios";

const breadcrumbs = [
  {
    label: "Manage Specifications",
    href: "/admin/manage-specifications-sections",
  },
  {
    label: "Edit Specification",
    href: "#",
  },
];

export default function EditPage({ params }: { params: { id: string } }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resolvedParams = await Promise.resolve(params);
        const id = resolvedParams?.id;

        if (id) {
          const response = await axios.get(
            `${process.env.API_URL}/sections/${id}`
          );
          if (response.data.data) {
            setData(response.data.data);
          }
        }
      } catch (err: any) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="space-y-6">
      <Breadcrumb items={breadcrumbs} />
      <PageTitle title="Edit Specification" />
      <div className="rounded-xl border-none bg-white p-6 shadow-none dark:bg-background [box-shadow:0_8px_34px_rgba(0,0,0,0.1)]">
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
        {!loading && !error && <FormComponent specification={data as any} />}
      </div>
    </div>
  );
}
