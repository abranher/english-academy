"use client";

import { EarningsCard } from "./EarningsCard";
import { ActiveStudentsCard } from "./ActiveStudentsCard";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import { Separator } from "@/components/shadcn/ui/separator";
import { CreditCard } from "lucide-react";

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

      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
        <EarningsCard tutorId={tutorId} />

        <ActiveStudentsCard tutorId={tutorId} />

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ventas</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12,234</div>
            <p className="text-xs text-muted-foreground">
              +19% respecto al mes pasado
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
