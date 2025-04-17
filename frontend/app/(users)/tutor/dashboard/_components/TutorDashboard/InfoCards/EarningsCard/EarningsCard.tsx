"use client";

import { useQuery } from "@tanstack/react-query";
import { getEarningsAnalytics } from "@/services/network/tutors/dashboard";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/shadcn/ui/card";
import { DollarSign } from "lucide-react";
import { Skeleton } from "@/components/shadcn/ui/skeleton";

export function EarningsCard({ tutorId }: { tutorId: string }) {
  const {
    isPending,
    data: earningsData,
    isError,
  } = useQuery<{
    totalEarnings: number;
    monthlyComparison: {
      current: number;
      percentageChange: number;
    };
  }>({
    queryKey: ["tutor_earnings_analytics", tutorId],
    queryFn: () => getEarningsAnalytics(tutorId),
  });

  if (isPending) return <Skeleton />;
  if (isError) return <>Ha ocurrido un error al cargar la info</>;

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Ingresos Totales
          </CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <CardTitle className="text-2xl font-bold">
            ${earningsData?.totalEarnings.toFixed(2)}$
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            {earningsData.monthlyComparison.percentageChange > 0 ? "+" : ""}
            {earningsData.monthlyComparison.percentageChange.toFixed(1)}%
            respecto al mes pasado
          </p>
        </CardContent>
      </Card>
    </>
  );
}
