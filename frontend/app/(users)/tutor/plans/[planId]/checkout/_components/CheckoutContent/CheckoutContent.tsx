"use client";

import { useParams } from "next/navigation";

import { Plan } from "@/types/models";
import { getPlan } from "@/services/network/plans/get-plan";
import { useQuery } from "@tanstack/react-query";
import { useStepPlanSubscriptionStore } from "@/services/store/tutor/plan-subscription";

import { StepOne } from "./StepOne";
import { StepTwo } from "./StepTwo";
import { StepThree } from "./StepThree";

import { Progress } from "@/components/shadcn/ui/progress";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";

export function CheckoutContent({
  userId,
  tutorId,
}: {
  userId: string;
  tutorId: string;
}) {
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
        <CardContent>
          {step === 1 && <StepOne plan={plan} />}
          {step === 2 && (
            <StepTwo userId={userId} tutorId={tutorId} plan={plan} />
          )}
          {step === 3 && <StepThree />}
        </CardContent>
      </CardHeader>
    </Card>
  );
}
