"use client";

import { useState } from "react";
import Link from "next/link";
import type { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  DivideSquare,
  Eye,
  History,
  MoreHorizontal,
  Pencil,
  Trash,
  View,
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

const data: Projects[] = [
  {
    id: "1",
    project_name: "Video Surveillance by Verkada",
    consultant_name: "Bhart Dan Gadhvi",
    createdAt: "2023-01-15T09:24:45",
    updatedAt: "2025-06-02T09:24:45",
  },
  {
    id: "2",
    project_name: "Access Control by Verkada",
    consultant_name: "Anand Patel",
    createdAt: "2023-02-20T14:35:12",
    updatedAt: "2025-06-02T09:24:45",
  },
  {
    id: "3",
    project_name: "Intercom Entry by Verkada",
    consultant_name: "Priti Shah",
    createdAt: "2023-03-10T11:12:30",
    updatedAt: "2025-06-02T09:24:45",
  },
  {
    id: "4",
    project_name: "Video Surveillance 2 by Verkada",
    consultant_name: "Jaymin Suthar",
    createdAt: "2023-04-05T16:48:22",
    updatedAt: "2025-06-02T09:24:45",
  },
  {
    id: "5",
    project_name: "Intrusion Detection by Verkada",
    consultant_name: "Saumil Gohel",
    createdAt: "2023-05-18T08:56:10",
    updatedAt: "2025-06-02T09:24:45",
  },
  {
    id: "6",
    project_name: "Access Control Badges",
    consultant_name: "Suraj Pandey",
    createdAt: "2023-06-22T13:15:45",
    updatedAt: "2025-06-02T09:24:45",
  },
];

export type Projects = {
  id: string;
  project_name: string;
  consultant_name?: string;
  createdAt: string;
  updatedAt: string;
};

export function Table() {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<Projects | null>(null);

  const handleDelete = async () => {
    if (userToDelete) {
      // In a real app, this would call a server action to delete the user
      await deleteUser(userToDelete.id);
      setDeleteDialogOpen(false);
      setUserToDelete(null);
      // You would typically refresh the data here
    }
  };

  const columns: ColumnDef<Projects>[] = [
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
      accessorKey: "project_name",
      header: ({ column }) => {
        return (
          <div
            // variant="ghost"
            className="flex items-center cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Project Name
            <ArrowUpDown className="ml-3 h-4 w-4" />
          </div>
        );
      },
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2">
            <div className="font-medium">{row.original.project_name}</div>
          </div>
        );
      },
    },
    {
      accessorKey: "consultant_name",
      header: ({ column }) => {
        return (
          <div
            // variant="ghost"
            className="flex items-center cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Consultant Name
            <ArrowUpDown className="ml-3 h-4 w-4" />
          </div>
        );
      },
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2">
            <div className="font-medium">{row.original.consultant_name}</div>
          </div>
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
      accessorKey: "updatedAt",
      header: ({ column }) => {
        return (
          <div
            // variant="ghost"
            className="flex items-center cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Last Updated At
            <ArrowUpDown className="ml-3 h-4 w-4" />
          </div>
        );
      },
      cell: ({ row }) => {
        return new Date(row.original.updatedAt).toLocaleDateString();
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
          <div className="flex items-center space-x-2">
            <Link
              href={`/admin/manage-projects/detail/${data.id}`}
              className="rounded-[12px] p-2 bg-yellow-100 hover:bg-yellow-200"
            >
              <Pencil className="h-4 w-4 text-yellow-600" />
            </Link>

            <Link
              href={`/admin/manage-projects/view/${data.id}`}
              className="rounded-[12px] p-2 bg-blue-200 hover:bg-blue-300"
            >
              <Eye className="h-4 w-4 text-blue-600" />
            </Link>
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
        searchColumn="project_name"
        searchPlaceholder="Search projects..."
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="rounded-xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              entry
              {userToDelete && ` "${userToDelete.project_name}"`} and remove
              their data from our servers.
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
