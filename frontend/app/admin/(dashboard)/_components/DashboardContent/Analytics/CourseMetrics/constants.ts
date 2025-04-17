import { ChartConfig } from "@/components/shadcn/ui/chart";

export const CHART_COLORS = [
  "#3b82f6", // blue-500
  "#10b981", // emerald-500
  "#f59e0b", // amber-500
  "#ef4444", // red-500
  "#8b5cf6", // violet-500
  "#ec4899", // pink-500
  "#14b8a6", // teal-500
  "#f97316", // orange-500
  "#64748b", // slate-500
  "#d946ef", // fuchsia-500
];

export const chartConfig = {
  users: {
    label: "Registros",
    color: "hsl(var(--chart-1))",
  },
  courses: {
    label: "Cursos",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;
