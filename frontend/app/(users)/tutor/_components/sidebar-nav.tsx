"use client";

import SideNav from "@/components/common/SideNav";
import {
  GraduationCap,
  MessageCircle,
  Pencil,
  UserPenIcon,
} from "lucide-react";

export function SidebarNav() {
  return (
    <>
      <SideNav
        links={[
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
        ]}
      />
    </>
  );
}
