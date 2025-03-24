"use client";

import Link from "next/link";

import {
  Plan,
  SubscriptionOrder,
  SubscriptionOrderHistory,
  Tutor,
  User,
} from "@/types/models";
import { formatDate } from "@/libs/date";
import { BillingCycle } from "@/types/enums";
import { formatPrice, truncateString } from "@/libs/format";

import { Title } from "@/components/common/Title";
import { OrderStatusBadge } from "@/components/subscription-orders";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import { Separator } from "@/components/shadcn/ui/separator";
import { Button } from "@/components/shadcn/ui/button";

export function OrderCard({
  subscriptionOrder,
}: {
  subscriptionOrder: SubscriptionOrder & {
    tutor: Tutor & { user: User };
    plan: Plan;
    subscriptionOrderHistory: SubscriptionOrderHistory[] | [];
  };
}) {
  return (
    <Card>
      <CardHeader>
        <section className="flex justify-between">
          <section className="flex items-center gap-3">
            <CardTitle>ID: </CardTitle>
            <CardDescription>
              {truncateString(subscriptionOrder.id, "xs")}
            </CardDescription>
          </section>

          <section className="flex items-center gap-3">
            <OrderStatusBadge status={subscriptionOrder.status} />
          </section>
        </section>
      </CardHeader>
      <CardContent>
        <section className="flex flex-col gap-5">
          <Title size="lg">Plan seleccionado:</Title>
          <section>
            <CardTitle>{subscriptionOrder.plan.name}</CardTitle>
            <section className="flex gap-2 items-center">
              <Title size="lxl">
                {formatPrice(subscriptionOrder.plan.price)}
              </Title>
              <span>
                {subscriptionOrder.plan.billingCycle === BillingCycle.MONTHLY &&
                  "/mes"}
                {subscriptionOrder.plan.billingCycle === BillingCycle.ANNUAL &&
                  "/año"}
              </span>
            </section>
            <CardDescription>
              {subscriptionOrder.plan.description}
            </CardDescription>
          </section>
        </section>
        <Separator className="my-4" />

        <section className="flex items-center gap-3">
          <Title size="lg">Tutor:</Title>
          <Link href={`/admin/tutors/${subscriptionOrder.tutor.user.id}`}>
            <Button variant="link" size="sm" className="p-0 h-3">
              @{subscriptionOrder.tutor.user.username}
            </Button>
          </Link>
        </section>
        <Separator className="my-4" />

        <Title size="lg">Datos de Pago:</Title>
        <section className="flex flex-col gap-4">
          <CardDescription className="text-lg flex justify-between">
            Método de pago: <strong>Pago Móvil</strong>
          </CardDescription>
          <Separator />

          <CardDescription className="text-lg flex justify-between">
            Referencia o comprobante de pago:{" "}
            <strong>{subscriptionOrder.paymentReference}</strong>
          </CardDescription>
          <Separator />

          <CardDescription className="text-lg flex justify-between">
            Fecha:
            <strong>{formatDate(subscriptionOrder.createdAt)}</strong>
          </CardDescription>
        </section>
      </CardContent>
    </Card>
  );
}
