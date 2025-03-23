"use client";

import { Plan } from "@/types/models";
import { useStepPlanSubscriptionStore } from "@/services/store/tutor/plan-subscription";

import { StepOne } from "./StepOne";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/shadcn/ui/alert-dialog";
import { Progress } from "@/components/shadcn/ui/progress";
import { Button } from "@/components/shadcn/ui/button";

export function PlanSubscriptionCheckout({ plan }: { plan: Plan }) {
  const open = useStepPlanSubscriptionStore((state) => state.open);
  const step = useStepPlanSubscriptionStore((state) => state.step);
  const totalSteps = useStepPlanSubscriptionStore((state) => state.totalSteps);
  const setOpen = useStepPlanSubscriptionStore((state) => state.setOpen);

  const progressValue = (step / totalSteps) * 100;

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button>Empieza con {plan.name}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            <article className="mb-3 text-center font-medium">
              Paso {step} de {totalSteps}
            </article>
            <Progress value={progressValue} className="mb-6" />
          </AlertDialogTitle>
          <section>{step === 1 && <StepOne plan={plan} />}</section>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}
