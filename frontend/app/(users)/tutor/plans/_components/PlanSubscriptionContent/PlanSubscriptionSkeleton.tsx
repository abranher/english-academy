"use client";

import { Title } from "@/components/common/Title";

import { CardDescription } from "@/components/shadcn/ui/card";
import { Skeleton } from "@/components/shadcn/ui/skeleton";

export function PlanSubscriptionSkeleton() {
  return (
    <>
      <section className="mb-8">
        <article className="text-center flex flex-col items-center">
          <Title size="lxl">Potencia tu enseñanza con nuestros planes.</Title>

          <CardDescription className="text-xl">
            ¡Bienvenido a nuestra comunidad de tutores! Ahora que tu perfil está
            validado, elige el plan que mejor se adapte a tus necesidades.
          </CardDescription>
        </article>
      </section>

      <section className="flex justify-center gap-3 py-3">
        <Skeleton className="w-32 py-4" />
      </section>
      <section className="flex flex-wrap items-center justify-center gap-5">
        {[1, 2, 3].map((item) => (
          <Skeleton className="min-w-96 max-w-96 h-96" key={item} />
        ))}
      </section>
    </>
  );
}
