"use client";

import { useQuery } from "@tanstack/react-query";
import { getCoursesStats } from "@/services/network/tutors/dashboard";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/shadcn/ui/card";
import { BookOpen } from "lucide-react";
import { Skeleton } from "@/components/shadcn/ui/skeleton";

export function CoursesStatsCard({ tutorId }: { tutorId: string }) {
  const {
    isPending,
    data: coursesData,
    isError,
  } = useQuery<{
    counts: {
      published: number;
      draft: number;
      archived: number;
      total: number;
    };
    percentages: {
      published: number;
      draft: number;
      archived: number;
    };
  }>({
    queryKey: ["tutor_courses_stats", tutorId],
    queryFn: () => getCoursesStats(tutorId),
  });

  if (isPending) return <Skeleton />;

  if (isError)
    return (
      <Card>
        <CardContent>Error al cargar estadísticas</CardContent>
      </Card>
    );

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Estadísticas de Cursos
        </CardTitle>
        <BookOpen className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="grid gap-1">
        <CardTitle className="text-2xl font-bold">
          {coursesData.counts.published}/{coursesData.counts.total} publicados
        </CardTitle>
        <section className="text-sm text-muted-foreground">
          <p>
            {coursesData.counts.draft} en borrador (
            {coursesData.percentages.draft}%)
          </p>
          <p>
            {coursesData.counts.archived} archivados (
            {coursesData.percentages.archived}%)
          </p>
        </section>
      </CardContent>
    </Card>
  );
}
