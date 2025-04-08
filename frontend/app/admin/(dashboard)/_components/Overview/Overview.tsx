"use client";

import { useQuery } from "@tanstack/react-query";
import { getMonthlyRegistrations } from "@/services/network/admin/dashboard";

import { InfoCards } from "./InfoCards";

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

const chartConfig = {
  users: {
    label: "Registros",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function Overview() {
  const { isPending, data } = useQuery({
    queryKey: ["monthly-registrations"],
    queryFn: getMonthlyRegistrations,
  });

  return (
    <>
      <InfoCards />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <section className="col-span-4">
          <Card>
            <CardHeader>
              <CardTitle>Registros Mensuales</CardTitle>
              <CardDescription>{new Date().getFullYear()}</CardDescription>
            </CardHeader>
            <CardContent>
              {isPending ? (
                <div>Cargando gráfico...</div>
              ) : (
                <ChartContainer config={chartConfig}>
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
              )}
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
        </section>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <CardDescription>You made 265 sales this month.</CardDescription>
          </CardHeader>
          <CardContent>
            {/*
      <RecentSales />*/}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
