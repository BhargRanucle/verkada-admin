"use client"

import { Users, Package, ShoppingCart, DollarSign, TrendingUp, TrendingDown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"

export function DashboardCards() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
    >
      <motion.div variants={item}>
        <Card className="group overflow-hidden rounded-xl border-none shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
          {/* <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 transform rounded-full bg-primary/10 transition-transform group-hover:translate-x-6 group-hover:-translate-y-6"></div> */}
          <CardHeader className="flex flex-row items-center justify-between pb-2 px-4">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Users className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent className="pb-6">
            <div className="text-3xl font-bold">1,234</div>
            <p className="mt-1 flex items-center text-xs text-muted-foreground">
              <span className="inline-flex items-center text-success">
                <TrendingUp className="mr-1 h-3 w-3" />
                +12.5%
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item}>
        <Card className="group overflow-hidden rounded-xl border-none shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
          {/* <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 transform rounded-full bg-primary/10 transition-transform group-hover:translate-x-6 group-hover:-translate-y-6"></div> */}
          <CardHeader className="flex flex-row items-center justify-between pb-2 px-4">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Package className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent className="pb-6">
            <div className="text-3xl font-bold">567</div>
            <p className="mt-1 flex items-center text-xs text-muted-foreground">
              <span className="inline-flex items-center text-success">
                <TrendingUp className="mr-1 h-3 w-3" />
                +7.2%
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item}>
        <Card className="group overflow-hidden rounded-xl border-none shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
          {/* <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 transform rounded-full bg-primary/10 transition-transform group-hover:translate-x-6 group-hover:-translate-y-6"></div> */}
          <CardHeader className="flex flex-row items-center justify-between pb-2 px-4">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
              <ShoppingCart className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent className="pb-6">
            <div className="text-3xl font-bold">892</div>
            <p className="mt-1 flex items-center text-xs text-muted-foreground">
              <span className="inline-flex items-center text-destructive">
                <TrendingDown className="mr-1 h-3 w-3" />
                -3.1%
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item}>
        <Card className="group overflow-hidden rounded-xl border-none shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
          {/* <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 transform rounded-full bg-primary/10 transition-transform group-hover:translate-x-6 group-hover:-translate-y-6"></div> */}
          <CardHeader className="flex flex-row items-center justify-between pb-2 px-4">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
              <DollarSign className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent className="pb-6">
            <div className="text-3xl font-bold">$89,234</div>
            <p className="mt-1 flex items-center text-xs text-muted-foreground">
              <span className="inline-flex items-center text-success">
                <TrendingUp className="mr-1 h-3 w-3" />
                +18.7%
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
