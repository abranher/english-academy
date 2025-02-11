"use client";

import { Badge } from "@/components/shadcn/ui/badge";
import { Button } from "@/components/shadcn/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/shadcn/ui/dropdown-menu";
import { formatPrice } from "@/libs/format";
import { cn } from "@/libs/shadcn/utils";
import { CoursePlatformStatus, CourseReviewStatus } from "@/types/enums";
import { Course } from "@/types/models/Course";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, Pencil } from "lucide-react";
import Link from "next/link";

export const columns: ColumnDef<Course>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Título
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Precio
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price") || "0");
      const formatted = formatPrice(price);
      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: "platformStatus", // Use platformStatus
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Estado en la plataforma
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const platformStatus: CoursePlatformStatus =
        row.getValue("platformStatus");

      let statusText: string;
      let badgeColor: string;

      switch (platformStatus) {
        case CoursePlatformStatus.DRAFT:
          statusText = "Borrador";
          badgeColor = "bg-slate-500";
          break;
        case CoursePlatformStatus.PUBLISHED:
          statusText = "Publicado";
          badgeColor = "bg-sky-700";
          break;
        case CoursePlatformStatus.ARCHIVED:
          statusText = "Archivado";
          badgeColor = "bg-gray-500";
          break;
        case CoursePlatformStatus.DELETED:
          statusText = "Eliminado";
          badgeColor = "bg-red-500";
          break;
        default: // Handle unexpected cases
          statusText = "Desconocido";
          badgeColor = "bg-yellow-500";
      }

      return <Badge className={cn(badgeColor)}>{statusText}</Badge>;
    },
  },

  {
    accessorKey: "reviewStatus", // Use reviewStatus
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Estado de revisión
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const reviewStatus: CourseReviewStatus = row.getValue("reviewStatus");

      let statusText: string;
      let badgeColor: string;

      switch (reviewStatus) {
        case CourseReviewStatus.DRAFT:
          statusText = "Borrador";
          badgeColor = "bg-slate-500";
          break;
        case CourseReviewStatus.PENDING_REVIEW:
          statusText = "Pendiente de revisión";
          badgeColor = "bg-yellow-500";
          break;
        case CourseReviewStatus.APPROVED:
          statusText = "Aprobado";
          badgeColor = "bg-green-500";
          break;
        case CourseReviewStatus.NEEDS_REVISION:
          statusText = "Necesita revisión";
          badgeColor = "bg-orange-500";
          break;
        case CourseReviewStatus.REJECTED:
          statusText = "Rechazado";
          badgeColor = "bg-red-500";
          break;
        default: // Handle unexpected cases
          statusText = "Desconocido";
          badgeColor = "bg-yellow-500";
      }

      return <Badge className={cn(badgeColor)}>{statusText}</Badge>;
    },
  },

  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const { id } = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="h-4 w-8 p-0" variant="ghost">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-6 w-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Link href={`/tutor/courses/${id}`}>
              <DropdownMenuItem>
                <Pencil className="h-4 w-4 mr-2" />
                Editar
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
