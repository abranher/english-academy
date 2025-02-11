"use client";

import Link from "next/link";

import { Badge } from "@/components/shadcn/ui/badge";
import { Button } from "@/components/shadcn/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/shadcn/ui/dropdown-menu";
import { cn } from "@/libs/shadcn/utils";
import { CourseReviewStatus } from "@/types/enums";
import { Course } from "@/types/models/Course";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Clock, MoreHorizontal, TextSearch } from "lucide-react";

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
    accessorKey: "tutorUsername",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Usuario
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div>{`@${row.getValue("tutorUsername")}` || ""}</div>;
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
      const { id, title, tutorUsername } = row.original;
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
                <TextSearch className="h-4 w-4 mr-2" />
                Revisar
              </DropdownMenuItem>
            </Link>
            <Link
              href={`/admin/courses/reviews/${id}?courseTitle=${title}&tutor=${tutorUsername}`}
            >
              <DropdownMenuItem>
                <Clock className="h-4 w-4 mr-2" />
                Historial de revisiones
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
