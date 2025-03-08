"use client";

import { CourseReviewDecision } from "@/types/enums";

import { Badge } from "@/components/shadcn/ui/badge";
import { BadgeCheck, BadgeInfo, BadgeX } from "lucide-react";

export function ReviewDecisionBadge({
  status,
}: {
  status: CourseReviewDecision | "";
}) {
  const statusConfig = {
    [CourseReviewDecision.NEEDS_CHANGES]: {
      icon: <BadgeInfo className="w-4" />,
      label: "Necesita cambios",
      variant: "warning" as const,
    },
    [CourseReviewDecision.REJECTED]: {
      icon: <BadgeX className="w-4" />,
      label: "Rechazado",
      variant: "destructive" as const,
    },
    [CourseReviewDecision.APPROVED]: {
      icon: <BadgeCheck className="w-4" />,
      label: "Aprobado",
      variant: "default" as const,
    },
    [""]: {
      icon: <BadgeCheck className="w-4" />,
      label: "Sin revisar",
      variant: "info" as const,
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
