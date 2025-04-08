"use client";

import { EarningsCard } from "./EarningsCard";
import { ActiveStudentsCard } from "./ActiveStudentsCard";
import { CoursesStatsCard } from "./CoursesStatsCard";
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

      <section className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
        <EarningsCard tutorId={tutorId} />
        <ActiveStudentsCard tutorId={tutorId} />
        <CoursesStatsCard tutorId={tutorId} />
      </section>

      <section className="flex flex-col gap-6 lg:flex-row">
        <TutorRevenueChart tutorId={tutorId} />
        <TutorStudentsChart tutorId={tutorId} />
      </section>
    </>
  );
}
