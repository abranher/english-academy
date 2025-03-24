"use client";

import { SubscriptionOrderStatus } from "@/types/enums";

import { CardDescription, CardTitle } from "@/components/shadcn/ui/card";
import { Separator } from "@/components/shadcn/ui/separator";

export function SubscriptionOrder() {
  return (
    <>
      <section className="flex flex-col gap-1">
        <CardTitle>Órden de suscripción</CardTitle>
        <CardDescription>
          Accede y gestiona la información de la órden de suscripción.
        </CardDescription>
      </section>

      <Separator />
    </>
  );
}
