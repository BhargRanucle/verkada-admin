"use client"

import { useState } from "react"
import Link from "next/link"
import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Eye, MoreHorizontal, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTable } from "@/components/data-table"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { deleteOrder } from "@/lib/actions"

// This would typically come from your database
const data: Order[] = [
  {
    id: "ORD-001",
    customer: "John Doe",
    email: "john@example.com",
    date: "2023-01-15T09:24:45",
    status: "Completed",
    total: 129.99,
    items: 3,
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    email: "jane@example.com",
    date: "2023-02-20T14:35:12",
    status: "Processing",
    total: 89.99,
    items: 2,
  },
  {
    id: "ORD-003",
    customer: "Robert Johnson",
    email: "robert@example.com",
    date: "2023-03-10T11:12:30",
    status: "Shipped",
    total: 199.99,
    items: 4,
  },
  {
    id: "ORD-004",
    customer: "Emily Davis",
    email: "emily@example.com",
    date: "2023-04-05T16:48:22",
    status: "Completed",
    total: 49.99,
    items: 1,
  },
  {
    id: "ORD-005",
    customer: "Michael Wilson",
    email: "michael@example.com",
    date: "2023-05-18T08:56:10",
    status: "Cancelled",
    total: 159.99,
    items: 3,
  },
  {
    id: "ORD-006",
    customer: "Sarah Thompson",
    email: "sarah@example.com",
    date: "2023-06-22T13:15:45",
    status: "Processing",
    total: 299.99,
    items: 5,
  },
  {
    id: "ORD-007",
    customer: "David Brown",
    email: "david@example.com",
    date: "2023-07-30T10:30:15",
    status: "Shipped",
    total: 79.99,
    items: 2,
  },
  {
    id: "ORD-008",
    customer: "Jennifer Martinez",
    email: "jennifer@example.com",
    date: "2023-08-12T15:22:33",
    status: "Completed",
    total: 149.99,
    items: 3,
  },
  {
    id: "ORD-009",
    customer: "Christopher Lee",
    email: "chris@example.com",
    date: "2023-09-05T09:10:20",
    status: "Processing",
    total: 399.99,
    items: 6,
  },
  {
    id: "ORD-010",
    customer: "Amanda White",
    email: "amanda@example.com",
    date: "2023-10-18T14:05:50",
    status: "Pending",
    total: 59.99,
    items: 1,
  },
]

export type Order = {
  id: string
  customer: string
  email: string
  date: string
  status: string
  total: number
  items: number
}

export function OrdersTable() {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [orderToDelete, setOrderToDelete] = useState<Order | null>(null)

  const handleDelete = async () => {
    if (orderToDelete) {
      // In a real app, this would call a server action to delete the order
      await deleteOrder(orderToDelete.id)
      setDeleteDialogOpen(false)
      setOrderToDelete(null)
      // You would typically refresh the data here
    }
  }

  const columns: ColumnDef<Order>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "id",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Order ID
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: "customer",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Customer
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: "date",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        return new Date(row.original.date).toLocaleDateString()
      },
    },
    {
      accessorKey: "status",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Status
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const status = row.original.status
        return (
          <Badge
            variant={
              status === "Completed"
                ? "success"
                : status === "Cancelled"
                  ? "destructive"
                  : status === "Processing" || status === "Shipped"
                    ? "default"
                    : "outline"
            }
          >
            {status}
          </Badge>
        )
      },
    },
    {
      accessorKey: "total",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Total
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const total = Number.parseFloat(row.getValue("total"))
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(total)
        return formatted
      },
    },
    {
      accessorKey: "items",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Items
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const order = row.original
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/admin/orders/${order.id}`} className="flex items-center">
                  <Eye className="mr-2 h-4 w-4" />
                  View Details
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={() => {
                  setOrderToDelete(order)
                  setDeleteDialogOpen(true)
                }}
              >
                <Trash className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  return (
    <>
      <DataTable columns={columns} data={data} searchColumn="customer" searchPlaceholder="Search orders..." />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the order
              {orderToDelete && ` "${orderToDelete.id}"`} and remove its data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
