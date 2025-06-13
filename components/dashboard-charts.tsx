"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"
import { motion } from "framer-motion"

const lineData = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 500 },
  { name: "Apr", value: 280 },
  { name: "May", value: 590 },
  { name: "Jun", value: 320 },
  { name: "Jul", value: 600 },
]

const barData = [
  { name: "Mon", value: 20 },
  { name: "Tue", value: 40 },
  { name: "Wed", value: 30 },
  { name: "Thu", value: 70 },
  { name: "Fri", value: 50 },
  { name: "Sat", value: 90 },
  { name: "Sun", value: 60 },
]

const pieData = [
  { name: "Electronics", value: 400 },
  { name: "Clothing", value: 300 },
  { name: "Food", value: 200 },
  { name: "Books", value: 100 },
]

const COLORS = [
  "hsl(var(--primary))",
  "hsl(var(--primary) / 0.8)",
  "hsl(var(--primary) / 0.6)",
  "hsl(var(--primary) / 0.4)",
]

export function DashboardCharts() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
      <Card className="overflow-hidden rounded-xl border-none shadow-lg">
        <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 pb-6 px-4">
          <CardTitle className="text-xl">Project Analytics</CardTitle>
          <CardDescription>Charts of Project Data for the Last Six Months</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs defaultValue="sales" className="w-full">
            {/* <TabsList className="grid w-full grid-cols-3 rounded-lg bg-muted p-1">
              <TabsTrigger value="sales" className="rounded-md">
                Sales
              </TabsTrigger>
              <TabsTrigger value="traffic" className="rounded-md">
                Traffic
              </TabsTrigger>
              <TabsTrigger value="products" className="rounded-md">
                Products
              </TabsTrigger>
            </TabsList> */}
            <TabsContent value="sales" className="space-y-4 pt-6">
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={lineData}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        borderRadius: "8px",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                        border: "1px solid hsl(var(--border))",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="hsl(var(--primary))"
                      strokeWidth={3}
                      dot={{ r: 4, strokeWidth: 2 }}
                      activeDot={{ r: 6 }}
                      fillOpacity={1}
                      fill="url(#colorValue)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            <TabsContent value="traffic" className="space-y-4 pt-6">
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData}>
                    <defs>
                      <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={1} />
                        <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0.6} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        borderRadius: "8px",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                        border: "1px solid hsl(var(--border))",
                      }}
                    />
                    <Bar dataKey="value" fill="url(#barGradient)" radius={[4, 4, 0, 0]} barSize={30} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            <TabsContent value="products" className="space-y-4 pt-6">
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      innerRadius={60}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        borderRadius: "8px",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                        border: "1px solid hsl(var(--border))",
                      }}
                    />
                    <Legend layout="horizontal" verticalAlign="bottom" align="center" iconType="circle" />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  )
}
