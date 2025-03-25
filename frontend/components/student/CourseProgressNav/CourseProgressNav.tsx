"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/libs/shadcn/utils";
import {
  ChevronDown,
  CheckCircle2,
  CircleDashed,
  Book,
  Video,
  ClipboardList,
} from "lucide-react";

interface NavItem {
  id: string;
  title: string;
  type: "chapter" | "class" | "quiz";
  completed: boolean;
  courseId: string;
  chapterId?: string;
  lessonId?: string;
  subItems?: NavItem[];
}

interface NavLinkProps extends NavItem {
  isSubItem?: boolean;
}

const NavLink = ({
  id,
  title,
  type,
  completed,
  courseId,
  chapterId,
  lessonId,
  subItems,
  isSubItem = false,
}: NavLinkProps) => {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(false);

  const hasSubItems = subItems && subItems.length > 0;

  // Generar la ruta según el tipo de elemento
  const getHref = () => {
    switch (type) {
      case "chapter":
        return `/course/${courseId}/chapter/${id}`;
      case "class":
        return `/course/${courseId}/chapter/${chapterId}/lesson/${lessonId}/class/${id}`;
      case "quiz":
        return `/course/${courseId}/chapter/${chapterId}/lesson/${lessonId}/quiz/${id}`;
      default:
        return "#";
    }
  };

  const href = getHref();
  const isActive = href ? pathname.startsWith(href) : false;

  const handleToggle = () => {
    if (hasSubItems) setIsExpanded(!isExpanded);
  };

  const getIcon = () => {
    if (completed) return CheckCircle2;

    switch (type) {
      case "chapter":
        return Book;
      case "class":
        return Video;
      case "quiz":
        return ClipboardList;
      default:
        return CircleDashed;
    }
  };

  const Icon = getIcon();

  return (
    <section className="flex flex-col gap-1">
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          {type !== "chapter" || !hasSubItems ? (
            <Link
              href={href}
              aria-label={`Ir a ${title}`}
              className={cn(
                "group flex flex-1 items-center cursor-pointer rounded-sm px-3 py-2 text-sm font-medium transition-colors",
                "hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50",
                isActive && "bg-zinc-100 dark:bg-zinc-800/50",
                isSubItem && "ml-4"
              )}
            >
              <div className="flex items-center w-full">
                <Icon
                  className={cn(
                    "mr-2 h-4 w-4 flex-shrink-0",
                    completed ? "text-green-500" : "text-zinc-400"
                  )}
                />
                <span
                  className={cn(
                    "truncate",
                    completed ? "text-green-600 dark:text-green-400" : ""
                  )}
                >
                  {title}
                </span>
              </div>
            </Link>
          ) : (
            <button
              onClick={handleToggle}
              className={cn(
                "group flex flex-1 items-center w-full cursor-pointer rounded-sm px-3 py-2 text-sm font-medium transition-colors text-left",
                "hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50",
                isSubItem && "ml-4"
              )}
              aria-expanded={isExpanded}
            >
              <div className="flex items-center w-full">
                <Icon
                  className={cn(
                    "mr-2 h-4 w-4 flex-shrink-0",
                    completed ? "text-green-500" : "text-zinc-400"
                  )}
                />
                <span
                  className={cn(
                    "truncate",
                    completed ? "text-green-600 dark:text-green-400" : ""
                  )}
                >
                  {title}
                </span>

                {hasSubItems && (
                  <ChevronDown
                    className={cn(
                      "ml-auto h-4 w-4 transition-transform",
                      isExpanded ? "rotate-180" : "rotate-0",
                      completed ? "text-green-500" : "text-zinc-400"
                    )}
                  />
                )}
              </div>
            </button>
          )}
        </div>

        {hasSubItems && isExpanded && (
          <div className="ml-8 flex flex-col gap-1 border-l-2 border-zinc-200 dark:border-zinc-700">
            {subItems.map((subItem) => (
              <NavLink
                key={subItem.id}
                {...subItem}
                isSubItem={true}
                courseId={courseId}
                chapterId={type === "chapter" ? id : chapterId}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

interface CourseNavProps {
  courseId: string;
  items: NavItem[];
}

export const CourseProgressNav = ({ courseId, items }: CourseNavProps) => {
  return (
    <div className="flex flex-col gap-1 py-2">
      <nav className="grid gap-1 px-2">
        {items.map((item) => (
          <NavLink key={item.id} {...item} courseId={courseId} />
        ))}
      </nav>
    </div>
  );
};
