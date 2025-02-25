"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Activity, CreditCard, Users } from "lucide-react";
import { getInfoCards } from "../../../_services/get-info-cards";

export function InfoCards() {
  const { isPending, data } = useQuery({
    queryKey: ["admin-info-cards"],
    queryFn: getInfoCards,
  });

  function calculateGrowth(
    currentMonthUsers: number,
    previousMonthUsers: number
  ): string {
    if (previousMonthUsers === 0) {
      return "No hay datos del mes anterior";
    }

    const growth =
      ((currentMonthUsers - previousMonthUsers) / previousMonthUsers) * 100;
    return `${growth.toFixed(1)}% respecto al mes pasado`;
  }

  if (isPending) return <div>Cargando...</div>;

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
              {calculateGrowth(data.totalUsers, data.previousMonthUsers)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Suscripciones</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2350</div>
            <p className="text-xs text-muted-foreground">
              +180,1% respecto al mes pasado
            </p>
          </CardContent>
        </Card>
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
