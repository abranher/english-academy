"use client";

import { Plan } from "@/types/models";
import { useQuery } from "@tanstack/react-query";
import { getPlans } from "@/services/network/plans/get-plans";
import { BillingCycle } from "@/types/enums";

import { Title } from "@/components/common/Title";
import { PlanCard } from "./PlanCard";
import { PlanSubscriptionSkeleton } from "./PlanSubscriptionSkeleton";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/shadcn/ui/tabs";
import { CardDescription } from "@/components/shadcn/ui/card";

export function PlanSubscriptionContent() {
  const {
    isPending,
    data: plans,
    isError,
  } = useQuery<Plan[] | []>({
    queryKey: ["plans_for_plan_subscription"],
    queryFn: getPlans,
  });

  if (isPending) return <PlanSubscriptionSkeleton />;
  if (isError) return <>Ha ocurrido un error al cargar los planes</>;

  return (
    <section className="mb-12">
      <article className="text-center flex flex-col items-center">
        <Title size="lxl">Potencia tu enseñanza con nuestros planes.</Title>

        <CardDescription className="text-xl">
          ¡Bienvenido a nuestra comunidad de tutores! Ahora que tu perfil está
          validado, elige el plan que mejor se adapte a tus necesidades.
        </CardDescription>
      </article>

      <section className="pt-12">
        <Tabs defaultValue={BillingCycle.MONTHLY}>
          <section className="flex justify-center gap-3">
            <TabsList>
              <TabsTrigger value={BillingCycle.MONTHLY}>Mensual</TabsTrigger>
              <TabsTrigger value={BillingCycle.ANNUAL}>Anual</TabsTrigger>
            </TabsList>
          </section>

          <TabsContent
            value={BillingCycle.MONTHLY}
            className="border-none p-6 outline-none"
          >
            <section className="flex flex-wrap items-center justify-center gap-7">
              {plans
                .filter((plan) => plan.billingCycle === BillingCycle.MONTHLY)
                .map((plan) => (
                  <PlanCard key={plan.id} plan={plan} />
                ))}
            </section>
          </TabsContent>

          <TabsContent
            value={BillingCycle.ANNUAL}
            className="border-none p-6 outline-none"
          >
            <section className="flex flex-wrap items-center justify-center gap-7">
              {plans
                .filter((plan) => plan.billingCycle === BillingCycle.ANNUAL)
                .map((plan) => (
                  <PlanCard key={plan.id} plan={plan} />
                ))}
            </section>
          </TabsContent>
        </Tabs>
      </section>

      <section className="pt-8 flex flex-col gap-5 text-center">
        <CardDescription className="text-xl">
          ¡Comienza a transformar la vida de tus estudiantes hoy mismo!
        </CardDescription>
      </section>
    </section>
  );
}
