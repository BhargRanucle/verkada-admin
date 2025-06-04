"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"
import { updateOrderStatus } from "@/lib/actions"
import type { Order } from "./orders-table"
import { motion } from "framer-motion"

interface OrderDetailsProps {
  order?: Order
}

export function OrderDetails({ order }: OrderDetailsProps) {
  const router = useRouter()
  const [status, setStatus] = useState(order?.status || "")
  const [isLoading, setIsLoading] = useState(false)

  // Mock order items data
  const orderItems = [
    {
      id: "1",
      name: "Wireless Headphones",
      price: 99.99,
      quantity: 1,
      total: 99.99,
    },
    {
      id: "2",
      name: "Phone Case",
      price: 19.99,
      quantity: 1,
      total: 19.99,
    },
    {
      id: "3",
      name: "USB-C Cable",
      price: 9.99,
      quantity: 1,
      total: 9.99,
    },
  ]

  // Mock customer details
  const customerDetails = {
    name: order?.customer || "John Doe",
    email: order?.email || "john@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, Anytown, USA 12345",
  }

  const handleUpdateStatus = async () => {
    if (!order) return

    setIsLoading(true)

    try {
      // In a real app, this would call a server action to update the order status
      await updateOrderStatus(order.id, status)
      toast({
        title: "Order status updated",
        description: `Order ${order.id} status has been updated to ${status}.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (!order) {
    return <div>Order not found</div>
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="grid gap-6 lg:grid-cols-2"
    >
      <div className="space-y-6">
        <Card className="rounded-xl border-none shadow-lg">
          <CardHeader>
            <CardTitle>Order Information</CardTitle>
            <CardDescription>View and manage order details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Order ID</p>
                <p className="font-medium">{order.id}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Date</p>
                <p className="font-medium">{new Date(order.date).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total</p>
                <p className="font-medium">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(order.total)}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Items</p>
                <p className="font-medium">{order.items}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-start space-y-2">
            <div className="flex w-full flex-col space-y-2">
              <div className="text-sm font-medium text-muted-foreground">Status</div>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger className="w-full sm:flex-1">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Processing">Processing</SelectItem>
                    <SelectItem value="Shipped">Shipped</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  onClick={handleUpdateStatus}
                  disabled={isLoading || status === order.status}
                  className="w-full sm:w-auto"
                >
                  {isLoading ? "Updating..." : "Update"}
                </Button>
              </div>
            </div>
          </CardFooter>
        </Card>

        <Card className="rounded-xl border-none shadow-lg">
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Name</p>
                <p className="font-medium">{customerDetails.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Email</p>
                <p className="font-medium break-all">{customerDetails.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Phone</p>
                <p className="font-medium">{customerDetails.phone}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-sm font-medium text-muted-foreground">Shipping Address</p>
                <p className="font-medium">{customerDetails.address}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-xl border-none shadow-lg">
        <CardHeader>
          <CardTitle>Order Items</CardTitle>
          <CardDescription>Items included in this order</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {orderItems.map((item) => (
              <div key={item.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{item.name}</div>
                  <div className="font-medium">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(item.total)}
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div>
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(item.price)}{" "}
                    × {item.quantity}
                  </div>
                </div>
                <Separator className="my-2" />
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="flex w-full items-center justify-between">
            <div className="text-sm font-medium">Subtotal</div>
            <div className="font-medium">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(orderItems.reduce((acc, item) => acc + item.total, 0))}
            </div>
          </div>
          <div className="flex w-full items-center justify-between">
            <div className="text-sm font-medium">Shipping</div>
            <div className="font-medium">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(0)}
            </div>
          </div>
          <div className="flex w-full items-center justify-between">
            <div className="text-sm font-medium">Tax</div>
            <div className="font-medium">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(orderItems.reduce((acc, item) => acc + item.total, 0) * 0.1)}
            </div>
          </div>
          <Separator />
          <div className="flex w-full items-center justify-between font-medium">
            <div>Total</div>
            <div>
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(orderItems.reduce((acc, item) => acc + item.total, 0) * 1.1)}
            </div>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
