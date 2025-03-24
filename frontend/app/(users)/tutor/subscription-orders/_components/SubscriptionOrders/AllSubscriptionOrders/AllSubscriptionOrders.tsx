"use client";

import { useQuery } from "@tanstack/react-query";
import { getSubscriptionOrders } from "../../../_services";
import { Plan, SubscriptionOrder, Tutor, User } from "@/types/models";

import { MiniOrderCard } from "../../MiniOrderCard";

import {
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import { Separator } from "@/components/shadcn/ui/separator";
import { Skeleton } from "@/components/shadcn/ui/skeleton";
import { FolderOpen } from "lucide-react";

export function AllSubscriptionOrders({ tutorId }: { tutorId: string }) {
  const {
    isPending,
    data: subscriptionOrders,
    isError,
  } = useQuery<
    (SubscriptionOrder & { tutor: Tutor & { user: User }; plan: Plan })[] | []
  >({
    queryKey: ["tutor_subscription_orders"],
    queryFn: () => getSubscriptionOrders(tutorId),
  });

  if (isError) return <div>Ocurrió un error al cargar las órdenes</div>;

  return (
    <>
      <CardHeader>
        <CardTitle>Listado de órdenes de suscripción</CardTitle>
        <CardDescription>
          En esta sección encontrarás todas las órdenes de suscripción.
        </CardDescription>
      </CardHeader>

      <Separator className="my-4" />

      <section className="flex w-full flex-wrap gap-3">
        {isPending ? (
          [1, 2, 3].map((i) => <Skeleton key={i} className="w-44 rounded-xl" />)
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
              No hay registros.
            </h2>
          </section>
        )}
      </section>
    </>
  );
}
