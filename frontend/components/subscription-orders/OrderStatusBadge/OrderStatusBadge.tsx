"use client";

import { SubscriptionOrderStatus } from "@/types/enums";

import { Badge } from "@/components/shadcn/ui/badge";
import { BadgeAlert, BadgeCheck, BadgeInfo, BadgeX } from "lucide-react";

export function OrderStatusBadge({
  status,
}: {
  status: SubscriptionOrderStatus;
}) {
  const statusConfig = {
    [SubscriptionOrderStatus.UNVERIFIED]: {
      icon: <BadgeInfo className="w-4" />,
      label: "Sin verificar",
      variant: "info" as const,
    },
    [SubscriptionOrderStatus.NEEDS_REVISION]: {
      icon: <BadgeAlert className="w-4" />,
      label: "Necesita revisión",
      variant: "warning" as const,
    },
    [SubscriptionOrderStatus.RESUBMITTED]: {
      icon: <BadgeCheck className="w-4" />,
      label: "Reenviada",
      variant: "success" as const,
    },
    [SubscriptionOrderStatus.CANCELED]: {
      icon: <BadgeX className="w-4" />,
      label: "Cancelada",
      variant: "destructive" as const,
    },
    [SubscriptionOrderStatus.COMPLETED]: {
      icon: <BadgeCheck className="w-4" />,
      label: "Completada",
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
