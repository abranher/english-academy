"use client";

import { InfoCards } from "./InfoCards";
import { TutorRevenueChart } from "./TutorRevenueChart";
import { TutorStudentsChart } from "./TutorStudentsChart";

import { CardDescription, CardTitle } from "@/components/shadcn/ui/card";
import { Separator } from "@/components/shadcn/ui/separator";

export function TutorDashboard({ tutorId }: { tutorId: string }) {
  return (
    <>
      <section className="flex flex-col gap-1">
        <CardTitle>Dashboard</CardTitle>
        <CardDescription>
          Visualiza analíticas y gráficas con información importante sobre tus
          cursos.
        </CardDescription>
      </section>
      <Separator />

      <InfoCards tutorId={tutorId} />

      <section className="flex flex-col gap-6 lg:flex-row">
        <TutorRevenueChart tutorId={tutorId} />
        <TutorStudentsChart tutorId={tutorId} />
      </section>
    </>
  );
}
