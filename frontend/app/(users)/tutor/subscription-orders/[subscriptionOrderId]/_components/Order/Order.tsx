"use client";

import { useParams } from "next/navigation";

import { useQuery } from "@tanstack/react-query";
import { getSubscriptionOrder } from "../../_services";
import {
  Plan,
  SubscriptionOrder,
  SubscriptionOrderHistory,
  Tutor,
  User,
} from "@/types/models";

import { StatusManagementHistory } from "../StatusManagementHistory";
import { OrderCard } from "../OrderCard";

import { CardDescription, CardTitle } from "@/components/shadcn/ui/card";
import { Separator } from "@/components/shadcn/ui/separator";

export function Order({ tutorId }: { tutorId: string }) {
  const { subscriptionOrderId } = useParams();

  const {
    isPending,
    data: subscriptionOrder,
    isError,
  } = useQuery<
    SubscriptionOrder & {
      tutor: Tutor & { user: User };
      plan: Plan;
      subscriptionOrderHistory: SubscriptionOrderHistory[] | [];
    }
  >({
    queryKey: ["admin_subscription_order", subscriptionOrderId],
    queryFn: () => getSubscriptionOrder(subscriptionOrderId as string, tutorId),
  });

  if (isPending) return <>Cargando...</>;
  if (isError) return <div>No se pudo cargar la órden de suscripción.</div>;

  return (
    <>
      <section className="flex flex-col gap-1">
        <CardTitle>Órden de suscripción</CardTitle>
        <CardDescription>
          Accede y gestiona la información de la órden de suscripción.
        </CardDescription>
      </section>

      <Separator />

      <OrderCard subscriptionOrder={subscriptionOrder} />

      <Separator />

      <StatusManagementHistory
        subscriptionOrderHistory={subscriptionOrder.subscriptionOrderHistory}
        subscriptionOrder={subscriptionOrder}
      />
    </>
  );
}
