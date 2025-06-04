import { OrdersTable } from "@/components/orders/orders-table"
import { PageTitle } from "@/components/page-title"
import { CreateButton } from "@/components/create-button"

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <PageTitle title="Orders Management" subtitle="Manage customer orders" />
        <CreateButton href="/admin/orders/create" label="Add Order" />
      </div>
      <OrdersTable />
    </div>
  )
}
