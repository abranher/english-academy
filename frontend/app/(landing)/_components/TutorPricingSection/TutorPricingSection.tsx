"use client";

import Link from "next/link";

import { Plan } from "@/types/models";
import { useQuery } from "@tanstack/react-query";
import { BillingCycle } from "@/types/enums";
import { getLandingPlans } from "../../_services/getLandingPlans";

import BoxBase from "@/components/common/BoxBase";
import { Title } from "@/components/common/Title";
import { TutorPricingSectionSkeleton } from "./TutorPricingSectionSkeleton";
import { PlanCard } from "./PlanCard";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/shadcn/ui/tabs";
import { CardDescription } from "@/components/shadcn/ui/card";
import { Button } from "@/components/shadcn/ui/button";
import { ArrowRight } from "lucide-react";

export function TutorPricingSection() {
  const {
    isPending,
    data: plans,
    isError,
  } = useQuery<Plan[] | []>({
    queryKey: ["plans_landing_page"],
    queryFn: getLandingPlans,
  });

  if (isPending) return <TutorPricingSectionSkeleton />;
  if (isError) return <>Ha ocurrido un error al cargar los planes</>;

  return (
    <BoxBase size="xl">
      <section className="mb-12">
        <article className="text-center flex flex-col items-center">
          <Title size="lxl">Potencia tu enseñanza con nuestros planes.</Title>

          <p className="text-2xl">
            Elige el que mejor se adapte a tus necesidades.
          </p>
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
            Elige el que mejor se adapte a tus necesidades. Primero, debes
            registrarte en la plataforma. Después, pasarás por un proceso de
            validación de tus datos como tutor. Una vez validado, podrás
            suscribirte a uno de los planes.
          </CardDescription>
          <article className="flex justify-center">
            <Link href="/tutors/signup">
              <Button className="flex gap-3">
                Solicitar
                <ArrowRight className="w-5" />
              </Button>
            </Link>
          </article>
        </section>
      </section>
    </BoxBase>
  );
}
