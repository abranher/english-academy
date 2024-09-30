"use client";

import Link from "next/link";
import { LucideIcon } from "lucide-react";

import { cn } from "@/libs/shadcn/utils";
import { buttonVariants } from "@/components/shadcn/ui/button";
import { usePathname } from "next/navigation";

export default function SideNav({
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
      <nav className="grid gap-3 px-2">
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className={cn(
              "flex px-3 py-2 items-center justify-center whitespace-nowrap text-md font-medium transition-colors",
              pathname === link.href &&
                "bg-zinc-100 text-zinc-900 border-l-3 border-zinc-400 dark:bg-zinc-800/50 dark:text-zinc-50",
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
