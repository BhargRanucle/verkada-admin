import type React from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Header } from "@/components/header"
import { BackgroundDecoration } from "@/components/background-decoration"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <BackgroundDecoration />
        <Header />
        <main className="relative flex-1 overflow-y-auto p-4 lg:p-6 xl:p-8">
          <div className="relative z-10 mx-auto max-w-7xl">{children}</div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
