"use client";

import Link from "next/link";

import { Plan } from "@/types/models";
import { formatPrice } from "@/libs/format";
import { BillingCycle } from "@/types/enums";

import { Title } from "@/components/common/Title";

import { Card, CardDescription, CardTitle } from "@/components/shadcn/ui/card";
import { Button } from "@/components/shadcn/ui/button";
import { Check } from "lucide-react";

export function PlanCard({ plan }: { plan: Plan }) {
  return (
    <Card className="p-8 flex flex-col gap-5 max-w-96 min-w-96">
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
        <Button asChild>
          <Link href={`/tutor/plans/${plan.id}/checkout`}>
            Empieza con {plan.name}
          </Link>
        </Button>
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
    </Card>
  );
}
