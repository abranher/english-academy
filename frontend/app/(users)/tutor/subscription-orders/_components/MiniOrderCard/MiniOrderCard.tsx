"use client";

import Link from "next/link";

import { formatDateForOrders } from "@/libs/date";
import { Plan, SubscriptionOrder, Tutor, User } from "@/types/models";

import { OrderStatusBadge } from "@/components/subscription-orders";

import { Button } from "@/components/shadcn/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import { ArrowUpRight } from "lucide-react";

export function MiniOrderCard({
  subscriptionOrder,
}: {
  subscriptionOrder: SubscriptionOrder & {
    tutor: Tutor & { user: User };
    plan: Plan;
  };
}) {
  return (
    <Card>
      <CardHeader>
        <section className="flex flex-col items-center gap-4">
          <section className="flex items-center gap-3">
            <CardTitle>Plan: {subscriptionOrder.plan.name}</CardTitle>
          </section>

          <section className="flex items-center gap-3">
            <CardDescription>
              {formatDateForOrders(subscriptionOrder.createdAt)}
            </CardDescription>
          </section>

          <section className="flex items-center gap-3">
            <OrderStatusBadge status={subscriptionOrder.status} />
          </section>

          <Link href={`/tutor/subscription-orders/${subscriptionOrder.id}`}>
            <Button className="flex gap-2">
              Ver más
              <ArrowUpRight className="opacity-90 w-4" />
            </Button>
          </Link>
        </section>
      </CardHeader>
    </Card>
  );
}
