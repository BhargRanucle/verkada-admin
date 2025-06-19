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

const data: Domain[] = [
  {
    id: "1",
    domain: "verkada.com",
    createdAt: "2023-01-15T09:24:45",
  },
  {
    id: "2",
    domain: "ranucle.com",
    createdAt: "2023-02-20T14:35:12",
  },
  {
    id: "3",
    domain: "lumopex.com",
    createdAt: "2023-03-10T11:12:30",
  },
  {
    id: "4",
    domain: "glimrova.com",
    createdAt: "2023-04-05T16:48:22",
  },
  {
    id: "5",
    domain: "brayvyn.io",
    createdAt: "2023-05-18T08:56:10",
  },
  {
    id: "6",
    domain: "quorvex.com",
    createdAt: "2023-06-22T13:15:45",
  },
  {
    id: "7",
    domain: "plyntrex.net",
    createdAt: "2023-07-30T10:30:15",
  },
  {
    id: "8",
    domain: "viroqua.org",
    createdAt: "2023-08-12T15:22:33",
  },
  {
    id: "9",
    domain: "skyntrix.io",
    createdAt: "2023-09-05T09:10:20",
  },
  {
    id: "10",
    domain: "thryvyn.io",
    createdAt: "2023-10-18T14:05:50",
  },
];

export type Domain = {
  id: string;
  domain: string;
  createdAt: string;
};

export function Table() {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<Domain | null>(null);

  const handleDelete = async () => {
    if (userToDelete) {
      await deleteUser(userToDelete.id);
      setDeleteDialogOpen(false);
      setUserToDelete(null);
    }
  };

  const columns: ColumnDef<Domain>[] = [
    {
      accessorKey: "domain",
      header: ({ column }) => {
        return (
          <div
            className="flex items-center cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Whitelisted Domains
            <ArrowUpDown className="ml-3 h-4 w-4" />
          </div>
        );
      },
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2">
            <div className="font-medium">{row.original.domain}</div>
          </div>
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
        const data = row.original;
        return (
          <div className="flex items-center space-x-2">
            <Link
              href={`/admin/whitelisted-domains/edit/${data.id}`}
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
        searchColumn="domain"
        searchPlaceholder="Search domains..."
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="rounded-xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              entry
              {userToDelete && ` "${userToDelete.domain}"`} and remove their data
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
