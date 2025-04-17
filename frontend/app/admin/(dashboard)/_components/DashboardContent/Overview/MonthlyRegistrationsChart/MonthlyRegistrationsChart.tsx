"use client";

import { useQuery } from "@tanstack/react-query";
import { getMonthlyRegistrations } from "@/services/network/admin/dashboard";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { TrendingUp } from "lucide-react";
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

const chartConfig = {
  users: {
    label: "Registros",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function MonthlyRegistrationsChart() {
  const { isPending, data, isError } = useQuery({
    queryKey: ["monthly-registrations"],
    queryFn: getMonthlyRegistrations,
  });

  if (isPending) return <Skeleton className="h-[420px]" />;
  if (isError) return <>Error al cargar los datos</>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Registros Mensuales</CardTitle>
        <CardDescription>{new Date().getFullYear()}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full h-80">
          <BarChart accessibilityLayer data={data.chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="users" fill="var(--color-users)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Evolución de registros mensuales
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Total de usuarios registrados por mes en el año actual
        </div>
      </CardFooter>
    </Card>
  );
}
