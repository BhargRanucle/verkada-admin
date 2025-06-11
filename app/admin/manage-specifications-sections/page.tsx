// import { PageTitle } from "@/components/page-title";
// import { Breadcrumb } from "@/components/breadcrumb";
// import { Metadata } from "next";
// import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import { Download, Edit, Shield } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import Image from "next/image";
// import { CreateButton } from "@/components/create-button";
// import { Table } from "@/components/manage-specifications-sections/table";

// export const metadata: Metadata = {
//   title: "Manage Specifications",
//   description: "Manage Specifications",
//   generator: "verkada",
// };

// export default function DashboardPage() {
//   const breadcrumbs = [
//     { label: "Manage Specifications", href: "/admin/manage-specifications-sections" },
//   ];

  
//   return (
//     <div className="space-y-6">
//       <Breadcrumb items={breadcrumbs} />
//       <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//         <PageTitle title="Manage Specifications" />
//       </div>
//       <Table data={[]} />
//     </div>
//   );
// }
'use client';
import { useEffect, useState } from "react";
import axios from "axios";
import { PageTitle } from "@/components/page-title";
import { Breadcrumb } from "@/components/breadcrumb";
import { Metadata } from "next";
import { Table } from "@/components/manage-specifications-sections/table";

// export const metadata: Metadata = {
//   title: "Manage Specifications",
//   description: "Manage Specifications",
//   generator: "verkada",
// };

export default function DashboardPage() {
  const breadcrumbs = [
    { label: "Manage Specifications", href: "/admin/manage-specifications-sections" },
  ];

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.API_URL}/sections`);
        if(response.data.data) {
          setData(response.data.data);
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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <PageTitle title="Manage Specifications" />
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {!loading && !error && <Table data={data} />}
    </div>
  );
}

