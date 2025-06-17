// "use client"

// import { usePathname } from "next/navigation"
// import Link from "next/link"
// import { ChevronRight } from "lucide-react"

// interface BreadcrumbItem {
//   label: string
//   href: string
//   isCurrentPage?: boolean
// }

// export function Breadcrumb() {
//   const pathname = usePathname()

//   const generateBreadcrumbs = (): BreadcrumbItem[] => {
//     const segments = pathname.split("/").filter(Boolean)
//     const breadcrumbs: BreadcrumbItem[] = []

//     if (segments[0] === "dashboard") {
//       breadcrumbs.push({
//         label: "Dashboard",
//         href: "/dashboard",
//         isCurrentPage: segments.length === 1,
//       })

//       for (let i = 1; i < segments.length; i++) {
//         const segment = segments[i]
//         const href = "/" + segments.slice(0, i + 1).join("/")
//         const isCurrentPage = i === segments.length - 1

//         let label = segment
//         if (segment === "users") label = "Users"
//         else if (segment === "products") label = "Products"
//         else if (segment === "orders") label = "Orders"
//         else if (segment === "settings") label = "Settings"
//         else if (segment === "create") label = "Create"
//         else if (segment.match(/^[0-9]+$/)) {
//           const parentSegment = segments[i - 1]
//           if (parentSegment === "users") label = `User #${segment}`
//           else if (parentSegment === "products") label = `Product #${segment}`
//           else if (parentSegment === "orders") label = `Order #${segment}`
//           else label = `Item #${segment}`
//         }

//         breadcrumbs.push({
//           label,
//           href,
//           isCurrentPage,
//         })
//       }
//     }

//     return breadcrumbs
//   }

//   const breadcrumbs = generateBreadcrumbs()

//   if (breadcrumbs.length === 0) return null

//   return (
//     <nav className="flex items-center space-x-1 text-sm text-muted-foreground" aria-label="Breadcrumb">
//       {breadcrumbs.map((item, index) => (
//         <div key={item.href} className="flex items-center">
//           {index > 0 && <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground/50" />}
//           {item.isCurrentPage ? (
//             <span className="font-medium text-foreground">{item.label}</span>
//           ) : (
//             <Link href={item.href} className="hover:text-foreground transition-colors">
//               {item.label}
//             </Link>
//           )}
//         </div>
//       ))}
//     </nav>
//   )
// }


"use client"

import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { motion } from "framer-motion"

interface BreadcrumbItem {
  label: string
  href: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  if (items.length === 0) return null

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center space-x-1 text-sm text-muted-foreground mb-6"
      aria-label="Breadcrumb"
    >
      <Link
        href="/admin/dashboard"
        className="flex items-center hover:text-foreground transition-colors p-1 rounded-md hover:bg-muted/50"
      >
        <Home className="h-4 w-4" />
        <span className="sr-only">Home</span>
      </Link>

      {items.map((item, index) => (
        <div key={item.href} className="flex items-center">
          <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground/50" />
          {index === items.length - 1 ? (
            <span className="font-medium text-foreground px-2 py-1 rounded-md bg-muted/50 below-320:text-[11px]">{item.label}</span>
          ) : (
            <Link
              href={item.href}
              className="hover:text-foreground transition-colors px-2 py-1 rounded-md hover:bg-muted/50 below-320:text-[11px]"
            >
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </motion.nav>
  )
}

