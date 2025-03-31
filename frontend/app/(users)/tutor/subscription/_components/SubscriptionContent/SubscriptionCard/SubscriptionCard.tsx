"use client";

import { BillingCycle } from "@/types/enums";
import { Plan, Subscription } from "@/types/models";
import { formatPrice, truncateString } from "@/libs/format";

import { Title } from "@/components/common/Title";
import { SubscriptionStatusBadge } from "@/components/subscriptions";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import { Separator } from "@/components/shadcn/ui/separator";

export function SubscriptionCard({
  activeSubscription,
}: {
  activeSubscription: Subscription & { plan: Plan };
}) {
  return (
    <Card>
      <CardHeader>
        <section className="flex justify-between">
          <section className="flex items-center gap-3">
            <CardTitle>ID: </CardTitle>
            <CardDescription>
              {truncateString(activeSubscription.id, "xs")}
            </CardDescription>
          </section>

          <section className="flex items-center gap-3">
            <SubscriptionStatusBadge status={activeSubscription.status} />
          </section>
        </section>
      </CardHeader>
      <CardContent>
        <section className="flex flex-col gap-5">
          <Title size="lg">Plan seleccionado:</Title>
          <section>
            <CardTitle>{activeSubscription.plan.name}</CardTitle>
            <section className="flex gap-2 items-center">
              <Title size="lxl">
                {formatPrice(activeSubscription.plan.price)}
              </Title>
              <span>
                {activeSubscription.plan.billingCycle ===
                  BillingCycle.MONTHLY && "/mes"}
                {activeSubscription.plan.billingCycle === BillingCycle.ANNUAL &&
                  "/año"}
              </span>
            </section>
            <CardDescription>
              {activeSubscription.plan.description}
            </CardDescription>
          </section>
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
            {/* <strong>{subscriptionOrder.paymentReference}</strong> */}
          </CardDescription>
          <Separator />

          <CardDescription className="text-lg flex justify-between">
            Fecha:
            {/* <strong>{formatDate(subscriptionOrder.createdAt)}</strong> */}
          </CardDescription>
        </section>
      </CardContent>
    </Card>
  );
}
