"use client";

import {
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import { Separator } from "@/components/shadcn/ui/separator";

export function AllSubscriptionOrders() {
  return (
    <>
      <CardHeader>
        <CardTitle>Listado de órdenes de suscripción</CardTitle>
        <CardDescription>
          En esta sección encontrarás todas las órdenes de suscripción.
        </CardDescription>
      </CardHeader>

      <Separator className="my-4" />
    </>
  );
}
