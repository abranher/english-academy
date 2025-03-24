"use client";

import { useQuery } from "@tanstack/react-query";
import { SubscriptionOrderStatus } from "@/types/enums";
import { Plan, SubscriptionOrder, Tutor, User } from "@/types/models";
import { getSubscriptionOrderByStatus } from "../../../_services";

import { MiniOrderCard } from "../../MiniOrderCard";

import {
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import { Separator } from "@/components/shadcn/ui/separator";
import { Skeleton } from "@/components/shadcn/ui/skeleton";
import { FolderOpen } from "lucide-react";

export function UnverifiedSubscriptionOrders() {
  const {
    isPending,
    data: subscriptionOrders,
    isError,
  } = useQuery<
    (SubscriptionOrder & { tutor: Tutor & { user: User }; plan: Plan })[] | []
  >({
    queryKey: ["admin_subscription_order", SubscriptionOrderStatus.UNVERIFIED],
    queryFn: () =>
      getSubscriptionOrderByStatus(SubscriptionOrderStatus.UNVERIFIED),
  });

  if (isError) return <div>Ocurrió un error al cargar las órdenes</div>;

  return (
    <>
      <CardHeader>
        <CardTitle>Listado de órdenes de suscripción sin verificar</CardTitle>
        <CardDescription>
          En esta sección encontrarás todas las órdenes de suscripción que aún
          no haz verificado.
        </CardDescription>
      </CardHeader>

      <Separator className="my-4" />

      <section className="flex w-full flex-wrap gap-3">
        {isPending ? (
          [1, 2, 3].map((_, i) => (
            <Skeleton key={i} className="w-44 rounded-xl" />
          ))
        ) : subscriptionOrders.length > 0 ? (
          subscriptionOrders.map((subscriptionOrder) => (
            <MiniOrderCard
              key={subscriptionOrder.id}
              subscriptionOrder={subscriptionOrder}
            />
          ))
        ) : (
          <section className="w-full text-zinc-700 dark:text-zinc-200 py-4">
            <h2 className="flex justify-center flex-col items-center">
              <FolderOpen className="w-24 h-24" />
              No hay órdenes sin verificar.
            </h2>
          </section>
        )}
      </section>
    </>
  );
}
