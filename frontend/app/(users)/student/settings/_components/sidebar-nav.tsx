"use client";

import SideNav from "@/components/admin/SideNav/SideNav";
import { AtSign, MessageCircle, Pencil, UserPenIcon } from "lucide-react";

export function SidebarNav() {
  return (
    <>
      <SideNav
        links={[
          {
            title: "Perfil",
            href: "/student/settings",
            icon: AtSign,
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
