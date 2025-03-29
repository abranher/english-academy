"use client";

import { EnrollmentOrderStatus } from "@/types/enums";

import { Badge } from "@/components/shadcn/ui/badge";
import { BadgeAlert, BadgeCheck, BadgeInfo, BadgeX } from "lucide-react";

export function OrderStatusBadge({
  status,
}: {
  status: EnrollmentOrderStatus;
}) {
  const statusConfig = {
    [EnrollmentOrderStatus.UNVERIFIED]: {
      icon: <BadgeInfo className="w-4" />,
      label: "Sin verificar",
      variant: "info" as const,
    },
    [EnrollmentOrderStatus.NEEDS_REVISION]: {
      icon: <BadgeAlert className="w-4" />,
      label: "Necesita revisión",
      variant: "warning" as const,
    },
    [EnrollmentOrderStatus.RESUBMITTED]: {
      icon: <BadgeCheck className="w-4" />,
      label: "Reenviada",
      variant: "success" as const,
    },
    [EnrollmentOrderStatus.CANCELED]: {
      icon: <BadgeX className="w-4" />,
      label: "Cancelada",
      variant: "destructive" as const,
    },
    [EnrollmentOrderStatus.APPROVED]: {
      icon: <BadgeCheck className="w-4" />,
      label: "Aprobada",
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
