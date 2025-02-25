"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/libs/shadcn/utils";
import { LucideIcon } from "lucide-react";

interface NavLinkProps {
  title: string;
  href: string;
  icon: LucideIcon;
  label?: string;
}

const NavLink = ({ title, href, icon: Icon, label }: NavLinkProps) => {
  const pathname = usePathname();
  const isDashboard = href === "/admin";
  const isActive = isDashboard ? pathname === href : pathname.startsWith(href);

  return (
    <Link
      href={href}
      aria-label={`Ir a ${title}`}
      className={cn(
        "flex px-3 py-2 items-center text-sm font-medium transition-colors",
        "justify-start hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50",
        isActive &&
          "bg-zinc-100 text-zinc-900 border-l-2 border-zinc-400 " +
            "dark:bg-zinc-800/50 dark:text-zinc-50 dark:border-zinc-500"
      )}
      aria-current={isActive ? "page" : undefined}
    >
      <Icon className="mr-2 h-4 w-4 flex-shrink-0" />
      <span className="truncate">{title}</span>
      {label && (
        <span className="ml-auto text-xs font-medium dark:text-zinc-400">
          {label}
        </span>
      )}
    </Link>
  );
};

interface SideNavProps {
  links: NavLinkProps[];
}

export const SideNav = ({ links }: SideNavProps) => {
  return (
    <div className="flex flex-col gap-1 py-2">
      <nav className="grid gap-1 px-2">
        {links.map((link, index) => (
          <NavLink key={index} {...link} />
        ))}
      </nav>
    </div>
  );
};
