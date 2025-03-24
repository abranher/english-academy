import { cn } from "@/libs/shadcn/utils";

interface BadgeProps {
  level: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
  children: React.ReactNode;
}

export function LevelBadge({ level, children }: BadgeProps) {
  const levelColors: Record<string, string> = {
    A1: "bg-blue-100 text-blue-600 border-blue-300 dark:bg-blue-950 dark:bg-opacity-40 dark:text-blue-300 dark:border-blue-700",
    A2: "bg-green-100 text-green-600 border-green-300 dark:bg-green-950 dark:bg-opacity-40 dark:text-green-300 dark:border-green-700",
    B1: "bg-yellow-100 text-yellow-600 border-yellow-300 dark:bg-yellow-950 dark:bg-opacity-40 dark:text-yellow-300 dark:border-yellow-700",
    B2: "bg-purple-100 text-purple-600 border-purple-300 dark:bg-purple-950 dark:bg-opacity-40 dark:text-purple-300 dark:border-purple-700",
    C1: "bg-red-100 text-red-600 border-red-300 dark:bg-red-950 dark:bg-opacity-40 dark:text-red-400 dark:border-red-700",
    C2: "bg-teal-100 text-teal-600 border-teal-200 dark:bg-teal-950 dark:bg-opacity-40 dark:text-teal-300 dark:border-teal-700",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1.5 text-sm font-bold rounded-md border",
        "shadow-sm transition-colors",
        levelColors[level]
      )}
    >
      {children}
    </span>
  );
}
