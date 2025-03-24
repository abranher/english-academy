"use client";

import Link from "next/link";

import { useStepPlanSubscriptionStore } from "@/services/store/tutor/plan-subscription";

import { CardDescription, CardTitle } from "@/components/shadcn/ui/card";
import { Button } from "@/components/shadcn/ui/button";
import { Separator } from "@/components/shadcn/ui/separator";

export function StepThree() {
  const nextStep = useStepPlanSubscriptionStore((state) => state.nextStep);
  const resetSteps = useStepPlanSubscriptionStore((state) => state.resetSteps);

  return (
    <>
      <section className="text-center mb-6">
        <CardTitle className="mb-3">¡Orden de subscripción creada!</CardTitle>
        <CardDescription>
          .
        </CardDescription>
      </section>

      <Separator />

      <article className="w-full flex justify-between mt-5">
        <Button variant="outline" asChild>
          <Link href={"/tutor/plans"}>Volver</Link>
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
