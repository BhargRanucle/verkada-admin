"use client";
import { Table } from "@/components/whitelisted-domains/table";
import { PageTitle } from "@/components/page-title";
import { CreateButton } from "@/components/create-button";
import { Breadcrumb } from "@/components/breadcrumb";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

// export const metadata: Metadata = {
//   title: "Whitelisted Domains",
//   description: "Whitelisted Domains",
//   generator: "verkada",
// };

export default function UsersPage() {
  const breadcrumbs = [
    { label: "Whitelisted Domains", href: "/admin/whitelisted-domains" },
  ];

  const handleFileSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("Selected file:", file.name);
      // Add your logic to handle the selected file
    }
  };

  return (
    <div className="space-y-6">
      <Breadcrumb items={breadcrumbs} />
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <PageTitle title="Whitelisted Domains" />
        <div>
          <CreateButton
            href="/admin/whitelisted-domains/create"
            label="Add Whitelisted Domain"
          />
          {/* <Button
                asChild
                className="ms-3 rounded-xl from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
              >
                <Link href="#" className="gap-2">
                  <Plus className="h-4 w-4" />
                  <span className="hidden sm:inline">Import Whitelisted Domains</span>
                  <span className="sm:hidden">Add</span>
                </Link>
              </Button> */}
          <span>
            <input
              type="file"
              accept=".csv"
              id="csvInput"
              style={{ display: "none" }}
              onChange={handleFileSelection}
            />

            <Button
              onClick={() => document.getElementById("csvInput")?.click()}
              className="ms-3 rounded-xl from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              <span className="gap-2 flex items-center">
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">
                  Import Whitelisted Domains
                </span>
                <span className="sm:hidden">Add</span>
              </span>
            </Button>
          </span>
        </div>
      </div>
      <Table />
    </div>
  );
}
