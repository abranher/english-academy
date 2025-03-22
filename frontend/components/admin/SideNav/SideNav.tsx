"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useState } from "react";
import { cn } from "@/libs/shadcn/utils";

import { ChevronDown, LucideIcon } from "lucide-react";

interface NavItem {
  title: string;
  href?: string;
  icon?: LucideIcon;
  label?: string;
  subItems?: NavItem[];
}

interface NavLinkProps extends NavItem {
  isSubItem?: boolean;
}

const NavLink = ({
  title,
  href,
  icon: Icon,
  label,
  subItems,
  isSubItem = false,
}: NavLinkProps) => {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(false);

  const hasSubItems = subItems && subItems.length > 0;
  const isActive = href
    ? pathname === href || (href !== "/admin" && pathname.startsWith(href))
    : false;

  const handleToggle = () => {
    if (hasSubItems) setIsExpanded(!isExpanded);
  };

  return (
    <section className="flex flex-col gap-1">
      <div
        className={cn(
          "group flex items-center justify-between cursor-pointer rounded-sm px-3 py-2 text-sm font-medium transition-colors",
          "hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50",
          isActive &&
            "bg-zinc-100 text-zinc-900 border-l-2 border-zinc-400 " +
              "dark:bg-zinc-800/50 dark:text-zinc-50 dark:border-zinc-500",
          isSubItem && "ml-4"
        )}
      >
        {href ? (
          <Link
            href={href}
            aria-label={`Ir a ${title}`}
            className="flex flex-1 items-center"
          >
            {Icon && <Icon className="mr-2 h-4 w-4 flex-shrink-0" />}
            <span className="truncate">{title}</span>
          </Link>
        ) : (
          <button
            onClick={handleToggle}
            className="flex flex-1 items-center"
            aria-expanded={isExpanded}
          >
            {Icon && <Icon className="mr-2 h-4 w-4 flex-shrink-0" />}
            <span className="truncate">{title}</span>
          </button>
        )}

        <div className="flex items-center gap-2">
          {label && (
            <span className="text-xs font-medium dark:text-zinc-400">
              {label}
            </span>
          )}
          {hasSubItems && (
            <ChevronDown
              className={cn(
                "h-4 w-4 transition-transform",
                isExpanded ? "rotate-180" : "rotate-0"
              )}
            />
          )}
        </div>
      </div>

      {hasSubItems && isExpanded && (
        <div className="ml-4 flex flex-col gap-1 border-l-2 border-zinc-200 dark:border-zinc-700">
          {subItems.map((subItem, index) => (
            <NavLink key={index} {...subItem} isSubItem={true} />
          ))}
        </div>
      )}
    </section>
  );
};

interface SideNavProps {
  links: NavItem[];
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
