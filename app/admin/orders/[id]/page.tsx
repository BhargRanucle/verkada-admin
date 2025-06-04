import { OrderDetails } from "@/components/orders/order-details"
import { PageTitle } from "@/components/page-title"
import { getOrderById } from "@/lib/data"

export default async function OrderDetailsPage({ params }: { params: { id: string } }) {
  const order = await getOrderById(params.id)

  return (
    <div className="space-y-6">
      <PageTitle title="Order Details" subtitle={`Order #${params.id}`} />
      <OrderDetails order={order} />
    </div>
  )
}
