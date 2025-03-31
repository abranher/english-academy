"use client";

import { SubscriptionStatus } from "@/types/enums";

import { Badge } from "@/components/shadcn/ui/badge";
import { BadgeAlert, BadgeCheck, BadgeInfo, BadgeX } from "lucide-react";

export function SubscriptionStatusBadge({
  status,
}: {
  status: SubscriptionStatus;
}) {
  const statusConfig = {
    [SubscriptionStatus.PENDING]: {
      icon: <BadgeInfo className="w-4" />,
      label: "Pendiente",
      variant: "info" as const,
    },
    [SubscriptionStatus.EXPIRED]: {
      icon: <BadgeAlert className="w-4" />,
      label: "Expirada",
      variant: "warning" as const,
    },
    [SubscriptionStatus.CANCELED]: {
      icon: <BadgeX className="w-4" />,
      label: "Cancelada",
      variant: "destructive" as const,
    },
    [SubscriptionStatus.ACTIVE]: {
      icon: <BadgeCheck className="w-4" />,
      label: "Activa",
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
