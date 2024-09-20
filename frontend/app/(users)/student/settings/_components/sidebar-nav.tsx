"use client";

import { Nav } from "@/components/settings/nav";
import { MessageCircle, Pencil, User, UserPenIcon } from "lucide-react";

export function SidebarNav() {
  return (
    <>
      <Nav
        links={[
          {
            title: "Perfil",
            href: "/student/settings",
            icon: User,
            variant: "default",
          },
          {
            title: "Cuenta",
            href: "/student/settings/account",
            icon: UserPenIcon,
            variant: "ghost",
          },
          {
            title: "Apariencia",
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
