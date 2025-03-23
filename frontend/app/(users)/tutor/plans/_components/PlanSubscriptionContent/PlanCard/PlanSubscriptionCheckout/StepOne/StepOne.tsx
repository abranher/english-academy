"use client";

import { Plan } from "@/types/models";
import { useStepPlanSubscriptionStore } from "@/services/store/tutor/plan-subscription";

import { Card, CardDescription, CardTitle } from "@/components/shadcn/ui/card";
import { Button } from "@/components/shadcn/ui/button";
import { Title } from "@/components/common/Title";
import { formatPrice } from "@/libs/format";
import { BillingCycle } from "@/types/enums";
import { Check } from "lucide-react";

export function StepOne({ plan }: { plan: Plan }) {
  const setOpen = useStepPlanSubscriptionStore((state) => state.setOpen);
  const nextStep = useStepPlanSubscriptionStore((state) => state.nextStep);
  const resetSteps = useStepPlanSubscriptionStore((state) => state.resetSteps);

  return (
    <>
      <section className="text-center mb-6">
        <CardTitle className="mb-3">
          Confirmación de la Orden de Suscripción
        </CardTitle>
        <CardDescription>
          Verifica el plan y haz clic en continuar.
        </CardDescription>
      </section>

      <Card className="p-8 flex flex-col gap-5">
        <section>
          <CardTitle>{plan.name}</CardTitle>
          <section className="flex gap-2 items-center">
            <Title size="lxl">{formatPrice(plan.price)}</Title>
            <span>
              {plan.billingCycle === BillingCycle.MONTHLY && "/mes"}
              {plan.billingCycle === BillingCycle.ANNUAL && "/año"}
            </span>
          </section>
          <CardDescription>{plan.description}</CardDescription>
        </section>

        <section>
          <ul className="flex flex-col gap-3">
            <li className="flex items-center gap-2">
              <Check className="w-5 h-5" />
              <p>
                {plan.maxCourses
                  ? plan.maxCourses > 1
                    ? `${plan.maxCourses} cursos`
                    : `${plan.maxCourses} curso`
                  : "Cursos ilimitados"}
              </p>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-5 h-5" />
              <p>Soporte 24/7</p>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-5 h-5" />
              <p>Avanced analytics</p>
            </li>
          </ul>
        </section>
      </Card>

      <article className="w-full flex justify-between mt-5">
        <Button
          variant="outline"
          onClick={() => {
            setOpen(false);
          }}
        >
          Cancelar
        </Button>

        <Button onClick={() => resetSteps()}>Reset</Button>

        <Button
          onClick={() => {
            nextStep();
          }}
        >
          Continuar
        </Button>
      </article>
    </>
  );
}
