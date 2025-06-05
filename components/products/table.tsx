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
const data: Product[] = [
  {
    id: "1",
    name: "AC12 1-Door Controller by Verkada Inc",
    product_category: "Door Controllers",
    content: "AC12 1-Door Controller by Verkada Inc",
    createdAt: "2023-01-15T09:24:45",
  },
  {
    id: "2",
    name: "AC41 4-Door Controller by Verkada Inc",
    product_category: "Door Controllers",
    content: "AC41 4-Door Controller by Verkada Inc",
    createdAt: "2023-02-20T14:35:12",
  },
  {
    id: "3",
    name: "AC42 4-Door Controller by Verkada Inc",
    product_category: "Door Controllers",
    content: "AC42 4-Door Controller by Verkada Inc",
    createdAt: "2023-03-10T11:12:30",
  },
  {
    id: "4",
    name: "AC62 16-Door Controller by Verkada Inc",
    product_category: "Door Controllers",
    content: "AC62 16-Door Controller by Verkada Inc",
    createdAt: "2023-04-05T16:48:22",
  },
  {
    id: "5",
    name: "AX11 IO Controller by Verkada Inc",
    product_category: "IO Controllers",
    content: "AX11 IO Controller by Verkada Inc",
    createdAt: "2023-05-18T08:56:10",
  },
  {
    id: "6",
    name: "AD34 by Verkada Inc",
    product_category: "Multi-Format Card Readers",
    content: "AD34 by Verkada Inc",
    createdAt: "2023-06-22T13:15:45",
  },
  {
    id: "7",
    name: "Compatible electromagnetic lock integration",
    product_category: "Integrated Card Reader Door Locks",
    content: "Compatible electromagnetic lock integration",
    createdAt: "2023-07-30T10:30:15",
  },
  {
    id: "8",
    name: "Compatible Electromagnetic Locks",
    product_category: "Integrated Card Reader Door Locks",
    content: "Compatible Electromagnetic Locks",
    createdAt: "2023-08-12T15:22:33",
  },
  {
    id: "9",
    name: "AD34 by Verkada Inc",
    product_category: "Multi-Format Card Readers",
    content: "AD34 by Verkada Inc",
    createdAt: "2023-09-05T09:10:20",
  },
  {
    id: "10",
    name: "AD64 by Verkada Inc",
    product_category: "Multi-Format Card Readers",
    content: "AD64 by Verkada Inc",
    createdAt: "2023-10-18T14:05:50",
  },
];

export type Product = {
  id: string;
  name: string;
  product_category: string;
  content: string;
  createdAt: string;
};

export function Table() {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<Product | null>(null);

  const handleDelete = async () => {
    if (userToDelete) {
      // In a real app, this would call a server action to delete the user
      await deleteUser(userToDelete.id);
      setDeleteDialogOpen(false);
      setUserToDelete(null);
      // You would typically refresh the data here
    }
  };

  const columns: ColumnDef<Product>[] = [
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
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <div
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
            <div className="font-medium">{row.original.name}</div>
          </div>
        );
      },
    },
     {
      accessorKey: "product_category",
      header: ({ column }) => {
        return (
          <div
            className="flex items-center cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Product Category
            <ArrowUpDown className="ml-3 h-4 w-4" />
          </div>
        );
      },
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2">
            <div className="font-medium">{row.original.product_category}</div>
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
              href={`/admin/products/edit/${data.id}`}
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
        searchColumn="name"
        searchPlaceholder="Search products..."
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
