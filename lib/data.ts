// This file would typically contain functions to fetch data from your database
// These are mock functions that return dummy data

import type { User } from "@/components/admin-users/users-table"
import type { Product } from "@/components/products/products-table"
import type { Order } from "@/components/orders/orders-table"

export async function getUserById(id: string): Promise<User | null> {
  // In a real app, this would fetch a user from the database
  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Return mock data
  return {
    id,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "Active",
    createdAt: "2023-01-15T09:24:45",
    avatar: "/placeholder.svg",
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  // In a real app, this would fetch a product from the database
  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Return mock data
  return {
    id,
    name: "Wireless Headphones",
    category: "Electronics",
    price: 99.99,
    stock: 45,
    status: "In Stock",
    createdAt: "2023-01-15T09:24:45",
  }
}

export async function getOrderById(id: string): Promise<Order | null> {
  // In a real app, this would fetch an order from the database
  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Return mock data
  return {
    id,
    customer: "John Doe",
    email: "john@example.com",
    date: "2023-01-15T09:24:45",
    status: "Completed",
    total: 129.99,
    items: 3,
  }
}
