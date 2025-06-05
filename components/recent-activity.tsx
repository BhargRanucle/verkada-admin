"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion } from "framer-motion"

const activities = [
  {
    id: 1,
    user: {
      name: "John Doe",
      email: "john@example.com",
      avatar: "/placeholder.svg",
      initials: "JD",
    },
    action: "created a new product category",
    time: "2 minutes ago",
  },
  {
    id: 3,
    user: {
      name: "Robert Johnson",
      email: "robert@example.com",
      avatar: "/placeholder.svg",
      initials: "RJ",
    },
    action: "updated their profile",
    time: "25 minutes ago",
  },
  {
    id: 4,
    user: {
      name: "Emily Davis",
      email: "emily@example.com",
      avatar: "/placeholder.svg",
      initials: "ED",
    },
    action: "added a new product",
    time: "1 hour ago",
  },
  {
    id: 5,
    user: {
      name: "Michael Wilson",
      email: "michael@example.com",
      avatar: "/placeholder.svg",
      initials: "MW",
    },
    action: "updated their profile",
    time: "2 hours ago",
  },
  {
    id: 6,
    user: {
      name: "Dan Brown",
      email: "dan@example.com",
      avatar: "/placeholder.svg",
      initials: "DB",
    },
    action: "deleted a product category (IO Controllers)",
    time: "3 hours ago",
  },
]

export function RecentActivity() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
      <Card className="overflow-hidden rounded-xl border-none shadow-lg">
        <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5 pb-6 px-4">
          <CardTitle className="text-xl">Recent Activity</CardTitle>
          <CardDescription>Latest actions performed by users</CardDescription>
        </CardHeader>
        <CardContent className="max-h-[350px] overflow-auto p-0 scrollbar-thin">
          <div className="divide-y">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-center gap-4 p-4 transition-colors hover:bg-muted/50">
                <Avatar className="h-10 w-10 border-2 border-background">
                  <AvatarImage src={activity.user.avatar || "/placeholder.svg"} alt={activity.user.name} />
                  <AvatarFallback className="bg-primary/10 text-primary">{activity.user.initials}</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    <span className="font-semibold">{activity.user.name}</span>{" "}
                    <span className="text-muted-foreground">{activity.action}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
