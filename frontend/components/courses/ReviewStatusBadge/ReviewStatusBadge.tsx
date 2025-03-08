"use client";

import { CourseReviewStatus } from "@/types/enums";

import { Badge } from "@/components/shadcn/ui/badge";
import { BadgeAlert, BadgeCheck, BadgeInfo, BadgeX } from "lucide-react";

export function ReviewStatusBadge({ status }: { status: CourseReviewStatus }) {
  const statusConfig = {
    [CourseReviewStatus.DRAFT]: {
      icon: <BadgeInfo className="w-4" />,
      label: "Borrador",
      variant: "info" as const,
    },
    [CourseReviewStatus.PENDING_REVIEW]: {
      icon: <BadgeAlert className="w-4" />,
      label: "Pendiente",
      variant: "warning" as const,
    },
    [CourseReviewStatus.NEEDS_REVISION]: {
      icon: <BadgeCheck className="w-4" />,
      label: "Necesita revisión",
      variant: "success" as const,
    },
    [CourseReviewStatus.REJECTED]: {
      icon: <BadgeX className="w-4" />,
      label: "Rechazado",
      variant: "destructive" as const,
    },
    [CourseReviewStatus.APPROVED]: {
      icon: <BadgeCheck className="w-4" />,
      label: "Aprobado",
      variant: "default" as const,
    },
  };

  const { icon, label, variant } = statusConfig[status] || {};
  return (
    <Badge className="flex gap-1 items-center" variant={variant}>
      {icon}
      {label}
    </Badge>
  );
}
