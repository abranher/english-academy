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
            href: "/tutor",
            icon: GraduationCap,
            variant: "default",
          },
          {
            title: "Preguntas y respuestas",
            href: "/student/settings/account",
            icon: UserPenIcon,
            variant: "ghost",
          },
          {
            title: "Reseñas",
            href: "/student/settings/appearance",
            icon: Pencil,
            variant: "ghost",
          },
          {
            title: "Notificaciones",
            href: "/student/settings/notifications",
            icon: MessageCircle,
            variant: "ghost",
          },
        ]}
      />
    </>
  );
}
