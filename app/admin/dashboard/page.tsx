import Head from "next/head";
import { DashboardCards } from "@/components/dashboard-cards";
import { DashboardCharts } from "@/components/dashboard-charts";
import { RecentActivity } from "@/components/recent-activity";
import { PageTitle } from "@/components/page-title";
import { Breadcrumb } from "@/components/breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard Overview",
  description: "Dashboard Overview",
  generator: "verkada",
};

export default function DashboardPage() {
  const breadcrumbs = [{ label: "Dashboard", href: "/admin/dashboard" }];

  return (
    <>
      {/* <Head>
        <title>Dashboard Overview</title>
        <meta
          name="description"
          content="Dashboard Overview"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head> */}
      <div className="space-y-6">
        <Breadcrumb items={breadcrumbs} />
        <PageTitle title="Dashboard Overview" />
        <DashboardCards />
        <div className="grid gap-6 lg:grid-cols-2">
          <DashboardCharts />
          <RecentActivity />
        </div>
      </div>
    </>
  );
}
