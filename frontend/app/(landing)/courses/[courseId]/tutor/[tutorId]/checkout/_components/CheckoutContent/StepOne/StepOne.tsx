"use client";

import Link from "next/link";

import { Course } from "@/types/models";
import { formatPrice } from "@/libs/format";
import { BillingCycle } from "@/types/enums";
import { useStepEnrollmentStore } from "@/services/store/student/enrollment";

import { Title } from "@/components/common/Title";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import { Button } from "@/components/shadcn/ui/button";
import { Separator } from "@/components/shadcn/ui/separator";
import { Input } from "@/components/shadcn/ui/input";
import { Check } from "lucide-react";

export function StepOne({ course }: { course: Course }) {
  const nextStep = useStepEnrollmentStore((state) => state.nextStep);
  const resetSteps = useStepEnrollmentStore((state) => state.resetSteps);

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

      <section className="flex flex-col gap-5">
        <section>
          <CardTitle>{course.}</CardTitle>
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
          <ul className="flex flex-col gap-3 font-bold">
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
      </section>

      <Separator className="my-4" />

      <section className="flex flex-col py-4">
        <Card>
          <CardHeader>
            <CardTitle>Código de promoción:</CardTitle>
          </CardHeader>

          <CardContent>
            <section className="flex gap-3 py-2">
              <Input />
              <Button>Aplicar</Button>
            </section>
            <CardDescription>Nota: solo puedes usar una vez</CardDescription>
          </CardContent>
        </Card>

        <Separator className="my-4" />

        <article className="flex justify-between">
          <CardDescription>Subtotal:</CardDescription>
          <CardDescription className="font-bold text-lg text-zinc-800">
            {formatPrice(plan.price)}
          </CardDescription>
        </article>

        <article className="flex justify-between">
          <CardDescription>Descuento:</CardDescription>
          <CardDescription className="font-bold text-lg text-zinc-800">
            $0.00
          </CardDescription>
        </article>
        <Separator className="my-4" />

        <article className="flex justify-between">
          <CardDescription>Total a pagar:</CardDescription>
          <CardDescription className="font-bold text-lg text-zinc-800">
            {formatPrice(plan.price)}
          </CardDescription>
        </article>
      </section>

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
