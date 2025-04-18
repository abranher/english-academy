"use client";

import Link from "next/link";
import { LucideIcon } from "lucide-react";

import { cn } from "@/libs/shadcn/utils";
import { buttonVariants } from "@/components/shadcn/ui/button";
import { usePathname } from "next/navigation";

export function Nav({
  links,
}: {
  links: {
    title: string;
    label?: string;
    icon: LucideIcon;
    variant: "default" | "ghost";
    href: string;
  }[];
}) {
  const pathname = usePathname();

  return (
    <div className="group flex flex-col gap-4 py-2">
      <nav className="grid gap-1 px-2">
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              pathname === link.href &&
                "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50",
              "justify-start"
            )}
          >
            <link.icon className="mr-2 h-4 w-4" />
            {link.title}
            {link.label && (
              <span
                className={cn(
                  "ml-auto",
                  link.variant === "default" &&
                    "text-background dark:text-white"
                )}
              >
                {link.label}
              </span>
            )}
          </Link>
        ))}
      </nav>
    </div>
  );
}
