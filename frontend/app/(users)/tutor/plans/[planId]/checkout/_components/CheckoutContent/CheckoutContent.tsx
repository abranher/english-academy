"use client";

import { useStepPlanSubscriptionStore } from "@/services/store/tutor/plan-subscription";

import { StepOne } from "./StepOne";

import { Card, CardHeader, CardTitle } from "@/components/shadcn/ui/card";
import { Progress } from "@/components/shadcn/ui/progress";
import { useQuery } from "@tanstack/react-query";
import { Plan } from "@/types/models";
import { getPlan } from "@/services/network/plans/get-plan";
import { useParams } from "next/navigation";

export function CheckoutContent() {
  const { planId } = useParams();

  const step = useStepPlanSubscriptionStore((state) => state.step);
  const totalSteps = useStepPlanSubscriptionStore((state) => state.totalSteps);

  const progressValue = (step / totalSteps) * 100;

  const {
    isPending,
    data: plan,
    isError,
  } = useQuery<Plan>({
    queryKey: ["plan_subscription_checkout"],
    queryFn: () => getPlan(planId as string),
  });

  if (isPending) return <>Cargando...</>;
  if (isError) return <>Ha ocurrido un error al cargar el plan</>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <article className="mb-3 text-center font-medium">
            Paso {step} de {totalSteps}
          </article>
          <Progress value={progressValue} className="mb-6" />
        </CardTitle>
        <section>{step === 1 && <StepOne plan={plan} />}</section>
      </CardHeader>
    </Card>
  );
}
