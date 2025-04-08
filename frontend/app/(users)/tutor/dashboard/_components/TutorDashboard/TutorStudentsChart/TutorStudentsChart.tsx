"use client";

import { useQuery } from "@tanstack/react-query";
import { getTutorCoursesStudents } from "@/services/network/tutors/dashboard";

import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/shadcn/ui/chart";
import { Skeleton } from "@/components/shadcn/ui/skeleton";
import { Users } from "lucide-react";

const studentsChartConfig = {
  students: {
    label: "Estudiantes",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export function TutorStudentsChart({ tutorId }: { tutorId: string }) {
  const { isPending, data, isError } = useQuery({
    queryKey: ["charts:tutor-courses-students", tutorId],
    queryFn: () => getTutorCoursesStudents(tutorId),
  });

  if (isPending) return <Skeleton className="w-full h-96" />;
  if (isError) return <>Ha ocurrido un error al cargar la info</>;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Estudiantes por Curso</CardTitle>
        <CardDescription>Distribución de inscripciones</CardDescription>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <ChartContainer config={studentsChartConfig}>
            <BarChart
              layout="vertical"
              data={data.chartData}
              margin={{ left: 30, right: 20 }}
            >
              <CartesianGrid horizontal={true} vertical={false} />
              <XAxis type="number" axisLine={false} tickLine={false} />
              <YAxis
                dataKey="course"
                type="category"
                tickFormatter={(value) =>
                  value.length > 15 ? `${value.substring(0, 15)}...` : value
                }
                tickLine={false}
                axisLine={false}
                width={120}
                tick={{ fontSize: 12 }}
              />
              <ChartTooltip
                content={<ChartTooltipContent indicator="dashed" />}
              />
              <Bar
                dataKey="students"
                fill="hsl(var(--chart-3))"
                radius={[0, 4, 4, 0]}
                barSize={20}
              />
            </BarChart>
          </ChartContainer>
        </ResponsiveContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Total estudiantes: {data?.totalStudents}
          <Users className="h-4 w-4" />
        </div>
      </CardFooter>
    </Card>
  );
}
