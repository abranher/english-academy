"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/libs/shadcn/utils";
import {
  GraduationCap,
  MessageCircle,
  Pencil,
  UserPenIcon,
} from "lucide-react";
import { useLinksCourseStore } from "@/store/tutor/courses/links-course";

export default function SideNav() {
  const href = useLinksCourseStore((state) => state.href);
  const setLink = useLinksCourseStore((state) => state.setLink);

  const links = [
    {
      title: "Cursos",
      href: "/tutor/courses",
      icon: GraduationCap,
    },
    {
      title: "Preguntas y respuestas",
      href: "/student/settings/account",
      icon: UserPenIcon,
    },
    {
      title: "Reseñas",
      href: "/student/settings/appearance",
      icon: Pencil,
    },
    {
      title: "Notificaciones",
      href: "/student/settings/notifications",
      icon: MessageCircle,
    },
  ];

  return (
    <>
      <div className="group flex flex-col gap-4 py-2">
        <nav className="grid gap-3 px-2">
          {links.map((link, index) => (
            <div
              key={index}
              className={cn(
                "flex px-3 py-2 items-center justify-center whitespace-nowrap text-md font-medium transition-colors cursor-pointer",
                href === link.href &&
                  "bg-zinc-100 text-zinc-900 border-l-3 border-zinc-400 dark:bg-zinc-800/50 dark:text-zinc-50",
                "justify-start"
              )}
              onClick={() => setLink(link.href)}
            >
              <link.icon className="mr-2 h-4 w-4" />
              {link.title}
            </div>
          ))}
        </nav>
      </div>
    </>
  );
}
