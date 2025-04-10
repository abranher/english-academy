import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/libs/shadcn/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border border-zinc-200 px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:ring-offset-2 dark:border-zinc-800 dark:focus:ring-zinc-300",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-zinc-900 text-zinc-50 hover:bg-zinc-900/80 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/80",
        secondary:
          "border-transparent bg-zinc-100 text-zinc-900 hover:bg-zinc-100/80 dark:bg-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-800/80",
        destructive:
          "border-transparent bg-red-500 text-zinc-50 hover:bg-red-500/80 dark:bg-zinc-900 dark:text-red-500 dark:hover:bg-zinc-900/80",
        outline: "text-zinc-950 dark:text-zinc-50",
        success: "border-transparent bg-emerald-600 text-white hover:bg-emerald-600/80 dark:bg-zinc-900 dark:text-emerald-600 dark:hover:bg-zinc-900/80",
        warning: "border-transparent bg-amber-500 text-white hover:bg-amber-600/80 dark:bg-zinc-900 dark:text-amber-500 dark:hover:bg-zinc-900/80",
        info: "border-transparent bg-sky-500 text-white hover:bg-sky-600/80 dark:bg-zinc-900 dark:text-sky-500 dark:hover:bg-zinc-900/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
