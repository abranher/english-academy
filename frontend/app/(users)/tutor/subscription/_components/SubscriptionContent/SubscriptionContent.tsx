"use client";

import { useQuery } from "@tanstack/react-query";
import { getSubscription } from "@/services/network/subscriptions";
import { Plan, Subscription } from "@/types/models";

import { CardDescription, CardTitle } from "@/components/shadcn/ui/card";
import { Separator } from "@/components/shadcn/ui/separator";
import { SubscriptionCard } from "./SubscriptionCard";

export function SubscriptionContent({ tutorId }: { tutorId: string }) {
  const {
    isPending,
    data: activeSubscription,
    isError,
  } = useQuery<Subscription & { plan: Plan }>({
    queryKey: ["tutor_subscription", tutorId],
    queryFn: () => getSubscription(tutorId),
  });

  if (isPending) return <>Cargando...</>;
  if (isError) return <>Ha ocurrido un error al cargar los planes</>;

  return (
    <>
      <section className="flex flex-col gap-1">
        <CardTitle>Mi Suscripción</CardTitle>
        <CardDescription>
          Accede y gestiona la información de tu Suscripción.
        </CardDescription>
      </section>

      <Separator />

      <SubscriptionCard activeSubscription={activeSubscription} />
    </>
  );
}
