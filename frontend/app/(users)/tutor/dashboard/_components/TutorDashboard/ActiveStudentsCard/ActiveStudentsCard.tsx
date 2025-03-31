"use client";

import { useQuery } from "@tanstack/react-query";
import { getActiveStudentsAnalytics } from "@/services/network/tutors/dashboard";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/shadcn/ui/card";
import { Users } from "lucide-react";
import { Skeleton } from "@/components/shadcn/ui/skeleton";

export function ActiveStudentsCard({ tutorId }: { tutorId: string }) {
  const {
    isPending,
    data: studentsData,
    isError,
  } = useQuery<{
    totalActive: number;
    monthlyComparison: {
      current: number;
      percentageChange: number;
    };
  }>({
    queryKey: ["tutor_active_students", tutorId],
    queryFn: () => getActiveStudentsAnalytics(tutorId),
  });

  if (isPending) return <Skeleton />;
  if (isError) return <>Error al cargar datos</>;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Estudiantes Activos
        </CardTitle>
        <Users className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">+{studentsData.totalActive}</div>
        <p className="text-xs text-muted-foreground">
          {studentsData.monthlyComparison.percentageChange > 0 ? "+" : ""}
          {studentsData.monthlyComparison.percentageChange.toFixed(1)}% respecto
          al mes pasado
        </p>
      </CardContent>
    </Card>
  );
}
