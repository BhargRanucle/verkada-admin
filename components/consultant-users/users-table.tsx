"use client";

import { useState } from "react";
import Link from "next/link";
import type { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  DivideSquare,
  MoreHorizontal,
  Pencil,
  Trash,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTable } from "@/components/data-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { deleteUser } from "@/lib/actions";

const data: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    company_name: "Ranucle",
    status: "Active",
    is_verified: true,
    createdAt: "2023-01-15T09:24:45",
    avatar: "/placeholder.svg",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    company_name: "Verkada",
    status: "Active",
    is_verified: false,
    createdAt: "2023-02-20T14:35:12",
    avatar: "/placeholder.svg",
  },
  {
    id: "3",
    name: "Robert Johnson",
    email: "robert@example.com",
    company_name: "Verkada",
    status: "Active",
    is_verified: true,
    createdAt: "2023-03-10T11:12:30",
    avatar: "/placeholder.svg",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily@example.com",
    company_name: "Ranucle",
    status: "Active",
    is_verified: true,
    createdAt: "2023-04-05T16:48:22",
    avatar: "/placeholder.svg",
  },
  {
    id: "5",
    name: "Michael Wilson",
    email: "michael@example.com",
    company_name: "Ranucle",
    status: "Inactive",
    is_verified: true,
    createdAt: "2023-05-18T08:56:10",
    avatar: "/placeholder.svg",
  },
  {
    id: "6",
    name: "Sarah Thompson",
    email: "sarah@example.com",
    company_name: "Verkada",
    status: "Inactive",
    is_verified: true,
    createdAt: "2023-06-22T13:15:45",
    avatar: "/placeholder.svg",
  },
  {
    id: "7",
    name: "David Brown",
    email: "david@example.com",
    company_name: "Verkada",
    status: "Active",
    is_verified: true,
    createdAt: "2023-07-30T10:30:15",
    avatar: "/placeholder.svg",
  },
  {
    id: "8",
    name: "Jennifer Martinez",
    email: "jennifer@example.com",
    status: "Active",
    company_name: "Ranucle",
    is_verified: true,
    createdAt: "2023-08-12T15:22:33",
    avatar: "/placeholder.svg",
  },
  {
    id: "9",
    name: "Christopher Lee",
    email: "chris@example.com",
    status: "Active",
    company_name: "Verkada",
    is_verified: true,
    createdAt: "2023-09-05T09:10:20",
    avatar: "/placeholder.svg",
  },
  {
    id: "10",
    name: "Amanda White",
    email: "amanda@example.com",
    status: "Active",
    company_name: "Ranucle",
    is_verified: true,
    createdAt: "2023-10-18T14:05:50",
    avatar: "/placeholder.svg",
  },
];

export type User = {
  id: string;
  name: string;
  email: string;
  is_verified: boolean;
  company_name: string;
  status: string;
  phone?: string;
  createdAt: string;
  avatar: string;
};

export function UsersTable() {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const handleDelete = async () => {
    if (userToDelete) {
      await deleteUser(userToDelete.id);
      setDeleteDialogOpen(false);
      setUserToDelete(null);
    }
  };

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <div
            // variant="ghost"
            className="flex items-center cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <ArrowUpDown className="ml-3 h-4 w-4" />
          </div>
        );
      },
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8 border-2 border-background">
              <AvatarImage
                src={row.original.avatar || "/placeholder.svg"}
                alt={row.original.name}
              />
              <AvatarFallback className="bg-primary/10 text-primary">
                {row.original.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="font-medium">{row.original.name}</div>
          </div>
        );
      },
    },
    {
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <div
            className="flex items-center cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email
            <ArrowUpDown className="ml-3 h-4 w-4" />
          </div>
        );
      },
    },
    {
      accessorKey: "company_name",
      header: ({ column }) => {
        return (
          <div
            className="flex items-center cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Company Name
            <ArrowUpDown className="ml-3 h-4 w-4" />
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: ({ column }) => {
        return (
          <div
            // variant="ghost"
            className="flex items-center cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Status
            <ArrowUpDown className="ml-3 h-4 w-4" />
          </div>
        );
      },
      cell: ({ row }) => {
        const status = row.original.status;
        return (
          <Badge
            variant={
              status === "Active"
                ? "success"
                : status === "Inactive"
                ? "destructive"
                : "outline"
            }
            className={
              status === "Active"
                ? "bg-emerald-500/10 text-emerald-500"
                : status === "Inactive"
                ? "bg-destructive/10 text-destructive"
                : "bg-amber-500/10 text-amber-500"
            }
          >
            {status}
          </Badge>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => {
        return (
          <div
            className="flex items-center cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Created At
            <ArrowUpDown className="ml-3 h-4 w-4" />
          </div>
        );
      },
      cell: ({ row }) => {
        return new Date(row.original.createdAt).toLocaleDateString();
      },
    },
    {
      id: "actions",
      header: ({ column }) => {
        return <div>Actions</div>;
      },
      cell: ({ row }) => {
        const user = row.original;
        return (
          <div className="flex items-center space-x-2">
            <Link
              href={`/admin/consultants-users/edit/${user.id}`}
              className="rounded-[12px] p-2 bg-yellow-100 hover:bg-yellow-200"
            >
              <Pencil className="h-4 w-4 text-yellow-600" />
            </Link>
            {/* <div
              className="rounded-[12px] p-2 bg-red-100 hover:bg-red-200 cursor-pointer"
              onClick={() => {
                setUserToDelete(user);
                setDeleteDialogOpen(true);
              }}
            >
              <Trash className="h-4 w-4 text-red-600" />
            </div> */}
          </div>
        );
      },
    },
  ];

  return (
    <>
      <DataTable
        columns={columns}
        data={data}
        searchColumn="name"
        searchPlaceholder="Search consultant users..."
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="rounded-xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              entry
              {userToDelete && ` "${userToDelete.name}"`} and remove their data
              from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-lg">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="rounded-lg bg-destructive text-destructive-foreground"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
