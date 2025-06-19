"use client";

import type * as React from "react";
import { useState, useEffect } from "react";
import {
  BarChart3,
  Users,
  LogOut,
  ChevronDown,
  ChevronUp,
  Settings,
  Package,
  ShieldOff,
  ShieldCheck,
  FileArchive,
  Router,
  FileType2,
  TableRowsSplit,
  FolderKanban,
  SquareChartGantt,
  FolderOpenDot,
  BookType,
  User,
  Globe,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const navItems = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: BarChart3,
  },
  {
    title: "Whitelisted Domains",
    href: "/admin/whitelisted-domains",
    icon: Globe,
  },
  {
    title: "User Management",
    href: "##",
    icon: Users,
    submenu: [
      {
        title: "Admin Users",
        href: "/admin/admin-users",
        icon: ShieldCheck,
      },
      {
        title: "Consultant Users",
        href: "/admin/consultants-users",
        icon: User,
      },
    ],
  },
  {
    title: "Div 28 Specifications",
    href: "#",
    icon: TableRowsSplit,
    submenu: [
      {
        title: "Product Categories",
        href: "/admin/product-categories",
        icon: FileType2,
      },
      {
        title: "Products",
        href: "/admin/products",
        icon: FolderKanban,
      },
      {
        title: "Manage Specifications",
        href: "/admin/manage-specifications",
        icon: SquareChartGantt,
      },
    ],
  },
  {
    title: "Manage Projects",
    href: "/admin/manage-projects",
    icon: FolderOpenDot,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const router = useRouter();

  const [openSubmenus, setOpenSubmenus] = useState<{ [key: string]: boolean }>(
    {}
  );
  const { state, setOpenMobile } = useSidebar();

  useEffect(() => {
    setOpenMobile(false);
  }, [pathname]);

  const toggleSubmenu = (href: string) => {
    setOpenSubmenus((prev) => ({ ...prev, [href]: !prev[href] }));
  };

  const renderNavItems = (items: typeof navItems) =>
    items.map((item) => (
      <SidebarMenuItem key={item.href}>
        <SidebarMenuButton
          onClick={() => item.submenu && toggleSubmenu(item.href)}
          asChild
          isActive={
            pathname === item.href || pathname.startsWith(`${item.href}/`)
          }
        >
          <div className="flex items-center justify-between w-full h-[40px]">
            <Link href={item.href} className="flex items-center text-[15px]">
              {item.icon && <item.icon className="h-[18px] me-1 pr-[6px]" />}
              <span>{item.title}</span>
            </Link>
            {item.submenu &&
              (openSubmenus[item.href] ? (
                <ChevronUp className="ml-2" />
              ) : (
                <ChevronDown className="ml-2" />
              ))}
          </div>
        </SidebarMenuButton>
        {item.submenu && openSubmenus[item.href] && (
          <SidebarGroupContent
            className={`${state == "collapsed" ? "" : "pl-4"} mt-2`}
          >
            <SidebarMenu>
              {item.submenu.map((subItem) => (
                <SidebarMenuItem key={subItem.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === subItem.href}
                  >
                    <Link href={subItem.href} className="flex items-center">
                      {subItem.icon && <subItem.icon className="mr-1" />}
                      <span>{subItem.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        )}
      </SidebarMenuItem>
    ));

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="border-b h-16">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              asChild
              className="w-[85%] hover:!bg-transparent hover:!text-inherit"
            >
              <Link href="/admin/dashboard">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 110 19"
                    className={`${
                      state == "collapsed" ? "w-[100px] mt-4" : "w-[100%]"
                    } `}
                  >
                    <path d="M8.227 13.638 21.667.217a.739.739 0 0 1 1.045 0l4.384 4.375c.289.29.289.759 0 1.045L14.18 18.535c-.29.289-.76.289-1.049 0l-4.905-4.9v.003ZM.217 5.64a.737.737 0 0 1 0-1.045L4.6.217c.29-.29.76-.29 1.049 0L12.444 7l-5.43 5.423L.218 5.64Z"></path>
                    <path d="M36.7 2.467h2.682l4.23 11.231 4.23-11.23h2.683l-5.468 14.424h-2.89L36.7 2.467ZM58.96 15.346s-1.34 1.751-4.23 1.751c-3.301 0-5.847-2.883-5.287-6.162.434-2.532 2.726-4.4 5.298-4.346 2.83.058 4.84 2.303 4.84 5.047 0 .62-.104 1.135-.104 1.135h-7.53c.249 1.134 1.238 2.163 2.89 2.163 1.753 0 2.785-1.258 2.785-1.258l1.341 1.67h-.002ZM57 10.812c-.309-1.135-1.136-1.959-2.477-1.959-1.445 0-2.27.824-2.578 1.96H57ZM61.5 6.794h2.374v1.443h.103s1.033-1.648 2.89-1.648h.412v2.575s-.308-.103-.825-.103c-1.444 0-2.578 1.134-2.578 2.886v4.945h-2.373V6.794H61.5ZM68.768 2.467h2.373v8.76l4.022-4.43h2.89l-3.818 4.225 4.023 5.873h-2.682l-2.89-4.225-1.548 1.75v2.475h-2.373V2.467h.003ZM85.282 15.553h-.104s-.928 1.547-2.99 1.547c-2.062 0-3.302-1.34-3.302-2.886 0-1.648 1.237-2.886 2.99-3.195l3.406-.619c0-.72-.825-1.547-1.961-1.547-1.507 0-2.477 1.236-2.477 1.236l-1.445-1.443s1.445-2.06 4.023-2.06c2.578 0 4.23 1.814 4.23 4.019v6.285H85.28v-1.34l.003.003Zm0-3.298-2.373.412c-1.238.226-1.65.62-1.65 1.236s.62 1.235 1.549 1.235c1.34 0 2.477-1.134 2.477-2.575v-.308h-.003ZM97.205 15.45h-.103s-.93 1.647-3.302 1.647c-2.373 0-4.54-2.163-4.54-5.254 0-3.09 2.166-5.254 4.54-5.254 2.373 0 3.302 1.648 3.302 1.648h.103v-5.77h2.374v14.425h-2.374V15.45Zm0-3.607c0-1.648-1.237-2.886-2.785-2.886-1.549 0-2.786 1.236-2.786 2.886 0 1.65 1.237 2.886 2.786 2.886 1.548 0 2.785-1.236 2.785-2.886ZM107.629 15.553h-.103s-.929 1.547-2.991 1.547c-2.062 0-3.301-1.34-3.301-2.886 0-1.648 1.237-2.886 2.99-3.195l3.405-.619c0-.72-.824-1.547-1.96-1.547-1.505 0-2.477 1.236-2.477 1.236l-1.445-1.443s1.445-2.06 4.023-2.06c2.578 0 4.23 1.814 4.23 4.019v6.285h-2.373v-1.34l.002.003Zm0-3.298-2.373.412c-1.237.226-1.649.62-1.649 1.236s.62 1.235 1.548 1.235c1.341 0 2.477-1.134 2.477-2.575v-.308h-.003Z"></path>
                  </svg>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="mt-5">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>{renderNavItems(navItems)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => router.push("/login")}
              >
                <LogOut />
                <span>Logout</span>
              </Button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
