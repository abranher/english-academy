"use client";

import BoxBase from "@/components/common/BoxBase";
import { Title } from "@/components/common/Title";

import { Skeleton } from "@/components/shadcn/ui/skeleton";

export function PlanSubscriptionSkeleton() {
  return (
    <BoxBase size="xl">
      <section className="mb-12">
        <article className="text-center flex flex-col items-center">
          <Title size="lxl">Potencia tu enseñanza con nuestros planes.</Title>

          <p className="text-2xl">
            Elige el que mejor se adapte a tus necesidades.
          </p>
        </article>
      </section>

      <section className="flex justify-center gap-3 py-3">
        <Skeleton className="w-32 py-4" />
      </section>
      <section className="flex items-center justify-center gap-5">
        {[1, 2, 3].map((item) => (
          <Skeleton className="min-w-96 max-w-96 h-96" key={item} />
        ))}
      </section>
    </BoxBase>
  );
}
