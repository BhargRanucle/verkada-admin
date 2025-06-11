"use client";

import { useState } from "react";
import Link from "next/link";
import type { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  DivideSquare,
  Download,
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
import axios from "axios";

// // This would typically come from your database
// const data: Specification[] = [
//   {
//     id: "1",
//     product_line: "28 10 00 Access Control 24.4",
//     status: "Active",
//     createdAt: "2023-01-15T09:24:45",
//   },
//   {
//     id: "2",
//     product_line: "28 15 23 Intercom Entry Systems 25.1",
//     status: "Inactive",
//     createdAt: "2023-02-20T14:35:12",
//   },
//   {
//     id: "3",
//     product_line: "28 17 11 Visitor Management Systems 25.1",
//     status: "Active",
//     createdAt: "2023-03-10T11:12:30",
//   },
//   {
//     id: "4",
//     product_line: "28 20 00 Video Surveillance, Gateways, Connector 25.1",
//     status: "Active",
//     createdAt: "2023-04-05T16:48:22",
//   },
//   {
//     id: "5",
//     product_line: "28 30 00 Environmental Sensors 25.1",
//     status: "Active",
//     createdAt: "2023-05-18T08:56:10",
//   },
//   {
//     id: "6",
//     product_line: "28 31 00 Intrusion Detection 25.1",
//     status: "Active",
//     createdAt: "2023-06-22T13:15:45",
//   },
// ];

// export type Specification = {
//   id: string;
//   general_sections: string;
//   product_sections: string;
//   execution: string;
//   title: string;
// };

interface TableProps {
  data: Record<string, any>[];
}

export function Table({data}: TableProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null) as any;

  const generateDocx = async (flag: any) => {
    try {
      const response = await axios.post(
        `${process.env.API_URL}/sections/generate-docx/${flag}`,
        "",
        {
          responseType: "blob",
        }
      );

      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "My_Document.docx";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading the file:", error);
      alert("Failed to download the file. Please try again.");
    }
  };

  const handleDelete = async () => {
    if (userToDelete) {
      // In a real app, this would call a server action to delete the user
      await deleteUser(userToDelete.id);
      setDeleteDialogOpen(false);
      setUserToDelete(null);
      // You would typically refresh the data here
    }
  };

  const columns: ColumnDef<TableProps>[] = [
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
      cell: ({ row }: any) => {
        return (
          <div className="flex items-center gap-2">
            <div className="font-medium">{row.original?.title}</div>
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
      cell: ({ row }: any) => {
        return new Date(row.original?.createdAt).toLocaleDateString();
      },
    },
    {
      id: "actions",
      header: ({ column }) => {
        return <div>Actions</div>;
      },
      cell: ({ row }) => {
        const data = row.original as any;
        return (
          <div className="flex items-center space-x-2">
            <Link
              href={`/admin/manage-specifications-sections/edit/${data?.flag}`}
              className="rounded-[12px] p-2 bg-yellow-100 hover:bg-yellow-200"
            >
              <Pencil className="h-4 w-4 text-yellow-600" />
            </Link>
            <div
              className="rounded-[12px] p-2 bg-[#c1c1c1] hover:bg-[#7e7e7e] cursor-pointer"
              onClick={()=> generateDocx(data?.flag)}
            >
              <Download className="h-4 w-4 text-[#000000]" />
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <DataTable
        columns={columns as any}
        data={data}
        searchColumn="title"
        searchPlaceholder="Search title..."
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="rounded-xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              entry
              {userToDelete && ` "${userToDelete.product_line}"`} and remove their data
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
