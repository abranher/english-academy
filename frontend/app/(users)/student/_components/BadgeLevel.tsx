import { cn } from "@/libs/shadcn/utils";

interface BadgeProps {
  level: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
}

export default function BadgeLevel({ level }: BadgeProps) {
  const levelColors: Record<string, string> = {
    A1: "bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-900 dark:text-blue-400 dark:border-blue-700",
    A2: "bg-green-50 text-green-600 border-green-200 dark:bg-green-900 dark:text-green-400 dark:border-green-700",
    B1: "bg-yellow-50 text-yellow-600 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-400 dark:border-yellow-700",
    B2: "bg-purple-50 text-purple-600 border-purple-200 dark:bg-purple-900 dark:text-purple-400 dark:border-purple-700",
    C1: "bg-red-50 text-red-600 border-red-200 dark:bg-red-900 dark:text-red-400 dark:border-red-700",
    C2: "bg-teal-50 text-teal-600 border-teal-200 dark:bg-teal-900 dark:text-teal-400 dark:border-teal-700",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md border",
        "shadow-sm transition-colors",
        levelColors[level]
      )}
    >
      {level}
    </span>
  );
}
