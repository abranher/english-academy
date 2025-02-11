"use client";

import { Badge } from "@/components/shadcn/ui/badge";
import { Button } from "@/components/shadcn/ui/button";
import { formatDate } from "@/libs/date";
import { cn } from "@/libs/shadcn/utils";
import { CourseReviewStatus } from "@/types/enums";
import { Course } from "@/types/models/Course";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<Course>[] = [
  {
    accessorKey: "feedback",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Feedback
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div>{`${row.getValue("feedback")}` || ""}</div>;
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
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Fecha
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div>{formatDate(row.getValue("createdAt")) || ""}</div>;
    },
  },
];
