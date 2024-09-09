"use client";

import { buttonVariants } from "@/components/shadcn/ui/button";
import { cn } from "@/libs/shadcn/utils";
import Link from "next/link";

export default function ConsiderationsPage() {
  return (
    <>
      <div className="container relative h-[600px] flex flex-col items-center justify-center">
        <div className="lg:p-8">
          <div className="mx-auto min-w-80">
            <div className="text-4xl">Consideraciones</div>
            <div>
              El test será con el fin de asignarte un nivel adecuado a tu
              dominio del idiomas.
            </div>
            <Link
              className={cn(buttonVariants({ variant: "default" }))}
              href="/students/initial-test/start"
            >
              Iniciar Test
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
