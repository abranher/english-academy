"use client";

import { useQuery } from "@tanstack/react-query";
import { getCourseMetrics } from "@/services/network/admin/dashboard";
import { CoursePlatformStatus } from "@/types/enums";
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";

import { CourseMetricsSkeleton } from "./CourseMetricsSkeleton";
import { CHART_COLORS, chartConfig } from "./constants";

import { ChartContainer } from "@/components/shadcn/ui/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shadcn/ui/table";

export function CourseMetrics() {
  const { isPending, data, isError } = useQuery<{
    statusDistribution: {
      status: CoursePlatformStatus;
      count: number;
    }[];
    popularCourses: {
      id: string;
      title: string;
      enrollments: number;
    }[];
  }>({
    queryKey: ["course-metrics"],
    queryFn: getCourseMetrics,
  });

  if (isPending) return <CourseMetricsSkeleton />;

  if (isError)
    return (
      <div className="text-destructive p-4 border border-destructive rounded-lg">
        Error al cargar los datos
      </div>
    );

  return (
    <>
      <CardTitle>Métricas de cursos</CardTitle>

      <section className="grid gap-6 xl:grid-cols-2">
        {/* Gráfico de distribución por estado */}
        <Card>
          <CardHeader>
            <CardTitle>Distribución por estado</CardTitle>
            <CardDescription>
              Estado actual de los cursos en la plataforma
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              title="Estados de cursos"
              config={chartConfig}
              className="w-full h-80"
            >
              <PieChart width={400} height={300}>
                <Pie
                  data={data.statusDistribution}
                  dataKey="count"
                  nameKey="status"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {data.statusDistribution.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={CHART_COLORS[index % CHART_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Legend />
                <Tooltip
                  formatter={(value, name, props) => [
                    value,
                    props.payload.status,
                  ]}
                />
              </PieChart>
            </ChartContainer>
          </CardContent>
          <CardFooter>
            <div className="text-sm text-muted-foreground">
              Distribución de cursos según su estado actual
            </div>
          </CardFooter>
        </Card>

        {/* Tabla de cursos populares */}
        <Card>
          <CardHeader>
            <CardTitle>Cursos más populares</CardTitle>
            <CardDescription>Cursos con más matriculaciones</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Curso</TableHead>
                  <TableHead className="text-right">Matriculaciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.popularCourses.map((course) => (
                  <TableRow key={course.id}>
                    <TableCell className="font-medium">
                      {course.title}
                    </TableCell>
                    <TableCell className="text-right">
                      {course.enrollments.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <div className="text-sm text-muted-foreground">
              Los cursos con mayor número de matriculaciones
            </div>
          </CardFooter>
        </Card>
      </section>
    </>
  );
}
