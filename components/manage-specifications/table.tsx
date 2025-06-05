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

// This would typically come from your database
const data: Specification[] = [
  {
    id: "1",
    title: "28 10 00 Access Control 24.4",
    status: "Active",
    createdAt: "2023-01-15T09:24:45",
  },
  {
    id: "2",
    title: "28 15 23 Intercom Entry Systems 25.1",
    status: "Inactive",
    createdAt: "2023-02-20T14:35:12",
  },
  {
    id: "3",
    title: "28 17 11 Visitor Management Systems 25.1",
    status: "Active",
    createdAt: "2023-03-10T11:12:30",
  },
  {
    id: "4",
    title: "28 20 00 Video Surveillance, Gateways, Connector 25.1",
    status: "Active",
    createdAt: "2023-04-05T16:48:22",
  },
  {
    id: "5",
    title: "28 30 00 Environmental Sensors 25.1",
    status: "Active",
    createdAt: "2023-05-18T08:56:10",
  },
  {
    id: "6",
    title: "28 31 00 Intrusion Detection 25.1",
    status: "Active",
    createdAt: "2023-06-22T13:15:45",
  },
];

export type Specification = {
  id: string;
  title: string;
  status: string;
  createdAt: string;
};

export function Table() {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<Specification | null>(null);

  const handleDelete = async () => {
    if (userToDelete) {
      // In a real app, this would call a server action to delete the user
      await deleteUser(userToDelete.id);
      setDeleteDialogOpen(false);
      setUserToDelete(null);
      // You would typically refresh the data here
    }
  };

  const columns: ColumnDef<Specification>[] = [
    // {
    //   id: "select",
    //   header: ({ table }) => (
    //     <Checkbox
    //       checked={
    //         table.getIsAllPageRowsSelected() ||
    //         (table.getIsSomePageRowsSelected() && "indeterminate")
    //       }
    //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    //       aria-label="Select all"
    //     />
    //   ),
    //   cell: ({ row }) => (
    //     <Checkbox
    //       checked={row.getIsSelected()}
    //       onCheckedChange={(value) => row.toggleSelected(!!value)}
    //       aria-label="Select row"
    //     />
    //   ),
    //   enableSorting: false,
    //   enableHiding: false,
    // },
    {
      accessorKey: "title",
      header: ({ column }) => {
        return (
          <div
            className="flex items-center cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Title
            <ArrowUpDown className="ml-3 h-4 w-4" />
          </div>
        );
      },
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2">
            <div className="font-medium">{row.original.title}</div>
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
            // variant="ghost"
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
        const data = row.original;
        return (
          // <DropdownMenu>
          //   <DropdownMenuTrigger asChild>
          //     <Button variant="ghost" className="h-8 w-8 p-0">
          //       <span className="sr-only">Open menu</span>
          //       <MoreHorizontal className="h-4 w-4" />
          //     </Button>
          //   </DropdownMenuTrigger>
          //   <DropdownMenuContent align="end">
          //     <DropdownMenuItem asChild>
          //       <Link href={`/admin/admin-users/${user.id}`} className="flex items-center">
          //         <Pencil className="mr-2 h-4 w-4" />
          //         Edit
          //       </Link>
          //     </DropdownMenuItem>
          //     <DropdownMenuItem
          //       className="text-destructive focus:text-destructive"
          //       onClick={() => {
          //         setUserToDelete(user)
          //         setDeleteDialogOpen(true)
          //       }}
          //     >
          //       <Trash className="mr-2 h-4 w-4" />
          //       Delete
          //     </DropdownMenuItem>
          //   </DropdownMenuContent>
          // </DropdownMenu>
          <div className="flex items-center space-x-2">
            <Link
              href={`/admin/manage-specifications/edit/${data.id}`}
              className="rounded-[12px] p-2 bg-yellow-100 hover:bg-yellow-200"
            >
              <Pencil className="h-4 w-4 text-yellow-600" />
            </Link>
            <div
              className="rounded-[12px] p-2 bg-red-100 hover:bg-red-200 cursor-pointer"
              onClick={() => {
                setUserToDelete(data);
                setDeleteDialogOpen(true);
              }}
            >
              <Trash className="h-4 w-4 text-red-600" />
            </div>
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
        searchColumn="title"
        searchPlaceholder="Search specifications..."
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="rounded-xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              entry
              {userToDelete && ` "${userToDelete.title}"`} and remove their data
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
