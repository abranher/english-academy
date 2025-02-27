"use client";

import { TutorStatus } from "@/types/enums/TutorStatus";

import { Badge } from "@/components/shadcn/ui/badge";
import { BadgeAlert, BadgeCheck, BadgeInfo, BadgeX } from "lucide-react";

export function StatusBadge({ status }: { status: TutorStatus }) {
  const statusConfig = {
    [TutorStatus.NEW]: {
      icon: <BadgeInfo className="w-4" />,
      label: "Nuevo",
      variant: "info" as const,
    },
    [TutorStatus.PENDING]: {
      icon: <BadgeAlert className="w-4" />,
      label: "Pendiente",
      variant: "warning" as const,
    },
    [TutorStatus.REJECTED]: {
      icon: <BadgeX className="w-4" />,
      label: "Rechazado",
      variant: "destructive" as const,
    },
    [TutorStatus.APPROVED]: {
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
