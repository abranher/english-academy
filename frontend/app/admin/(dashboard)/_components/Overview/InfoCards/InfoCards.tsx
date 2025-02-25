"use client";

import { useQuery } from "@tanstack/react-query";
import { getInfoCards } from "../../../_services/get-info-cards";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import { Activity, Users } from "lucide-react";
import { InfoCardsSkeleton } from "./InfoCardsSkeleton";

function calculateGrowthMonthly(current: number, previous: number): string {
  if (previous === 0) return "No hay datos del mes anterior";
  const growth = ((current - previous) / previous) * 100;
  return `${growth.toFixed(1)}% respecto al mes pasado`;
}

function calculateGrowthYearly(current: number, previous: number): string {
  if (previous === 0) return "No hay datos del año anterior";
  const growth = ((current - previous) / previous) * 100;
  return `${growth.toFixed(1)}% respecto al año pasado`;
}

export function InfoCards() {
  const { isPending, data } = useQuery({
    queryKey: ["admin-info-cards"],
    queryFn: getInfoCards,
  });

  if (isPending) return <InfoCardsSkeleton />;

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Usuarios Registrados
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              {calculateGrowthMonthly(data.totalUsers, data.previousMonthUsers)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Usuarios este año
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.currentYearUsers}</div>
            <p className="text-xs text-muted-foreground">
              {calculateGrowthYearly(data.currentYearUsers, data.lastYearUsers)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Activo ahora</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground">
              +201 desde la última hora
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
