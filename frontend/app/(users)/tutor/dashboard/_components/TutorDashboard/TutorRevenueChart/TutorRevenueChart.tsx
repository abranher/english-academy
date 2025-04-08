"use client";

import { useQuery } from "@tanstack/react-query";
import { getTutorMonthlyRevenue } from "@/services/network/tutors/dashboard";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
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
import { DollarSign } from "lucide-react";

const revenueChartConfig = {
  revenue: {
    label: "Ingresos",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function TutorRevenueChart({ tutorId }: { tutorId: string }) {
  const { isPending, data, isError } = useQuery({
    queryKey: ["charts:tutor-monthly-revenue", tutorId],
    queryFn: () => getTutorMonthlyRevenue(tutorId),
  });

  if (isPending) return <Skeleton className="w-full h-96" />;
  if (isError) return <>Ha ocurrido un error al cargar la info</>;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Ingresos Mensuales</CardTitle>
        <CardDescription>Evolución de tus ganancias</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={revenueChartConfig}>
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
            <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Total acumulado: ${data?.totalRevenue}
          <DollarSign className="h-4 w-4" />
        </div>
      </CardFooter>
    </Card>
  );
}
