"use client";

import { TutorStatus } from "@/types/enums/TutorStatus";

import { Badge } from "@/components/shadcn/ui/badge";
import { BadgeAlert, BadgeCheck, BadgeX } from "lucide-react";

export function StatusBadge({ status }: { status: TutorStatus }) {
  const statusConfig = {
    [TutorStatus.PENDING]: {
      icon: <BadgeAlert />,
      label: "Sin verificar",
      variant: "destructive" as const,
    },
    [TutorStatus.REJECTED]: {
      icon: <BadgeX />,
      label: "Rechazado",
      variant: "secondary" as const,
    },
    [TutorStatus.APPROVED]: {
      icon: <BadgeCheck />,
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
