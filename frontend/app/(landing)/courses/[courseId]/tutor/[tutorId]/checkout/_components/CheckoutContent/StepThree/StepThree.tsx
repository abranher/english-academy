"use client";

import Link from "next/link";

import { useStepPlanSubscriptionStore } from "@/services/store/tutor/plan-subscription";

import { Title } from "@/components/common/Title";

import { CardContent, CardDescription } from "@/components/shadcn/ui/card";
import { Button } from "@/components/shadcn/ui/button";

export function StepThree() {
  const nextStep = useStepPlanSubscriptionStore((state) => state.nextStep);
  const resetSteps = useStepPlanSubscriptionStore((state) => state.resetSteps);

  return (
    <>
      <CardContent className="text-center flex flex-col items-center gap-4 my-16">
        <Title size="lxl">🎉 ¡Éxito! 🎉</Title>
        <CardDescription className="text-lg">
          Tu orden de suscripción ha sido creada con éxito. En este momento,
          está en proceso de verificación. Te mantendremos informado sobre el
          estado de tu orden.
        </CardDescription>

        <CardDescription className="text-lg">
          Para revisar tus órdenes de suscripción, haz clic en el botón a
          continuación:
        </CardDescription>

        <Button asChild>
          <Link href={`/tutor/subscription-orders`}>
            Ver historial de órdenes
          </Link>
        </Button>
      </CardContent>
    </>
  );
}
