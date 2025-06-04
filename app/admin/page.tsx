import { DashboardCards } from "@/components/dashboard-cards"
import { DashboardCharts } from "@/components/dashboard-charts"
import { RecentActivity } from "@/components/recent-activity"
import { PageTitle } from "@/components/page-title"
import { Breadcrumb } from "@/components/breadcrumb"

export default function DashboardPage() {
  const breadcrumbs = [
    { label: "Users", href: "#" },
    { label: "Users", href: "/admin/users" },
  ]
  return (
    <div className="space-y-6">
      {/* <Breadcrumb /> */}
      <Breadcrumb items={breadcrumbs} />
      <PageTitle title="Dashboard Overview" subtitle="Welcome to your admin dashboard" />
      <DashboardCards />
      <div className="grid gap-6 lg:grid-cols-2">
        <DashboardCharts />
        <RecentActivity />
      </div>
    </div>
  )
}
