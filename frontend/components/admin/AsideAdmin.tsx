"use client";

import Link from "next/link";
import {
  Bell,
  ClipboardList,
  DatabaseBackup,
  GraduationCap,
  Home,
  Package2,
  Users,
} from "lucide-react";
import { Button } from "@/components/shadcn/ui/button";
import { SideNav } from "@/components/common/SideNav";

const adminLinks = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: Home,
  },
  {
    title: "Gestión de Usuarios",
    icon: Users,
    subItems: [
      {
        title: "Tutores",
        href: "/admin/tutors",
      },
      {
        title: "Estudiantes",
        href: "/admin/students",
      },
      {
        title: "Administradores",
        href: "/admin/admins",
      },
    ],
  },
  {
    title: "Cursos",
    icon: GraduationCap,
    subItems: [
      {
        title: "Todos los cursos",
        href: "/admin/courses",
      },
      {
        title: "Categorías",
        href: "/admin/courses/categories",
      },
      {
        title: "Nuevo curso",
        href: "/admin/courses/new",
      },
    ],
  },
  {
    title: "Bitácora",
    href: "/admin/activity-log",
    icon: ClipboardList,
  },
  {
    title: "Base de datos",
    href: "/admin/database",
    icon: DatabaseBackup,
  },
];

export const AsideAdmin = () => {
  return (
    <div className="hidden border-r bg-muted/40 md:block dark:border-zinc-800">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6 dark:border-zinc-800">
          <Link
            href="/"
            className="flex items-center gap-2 font-semibold"
            aria-label="Ir al inicio"
          >
            <Package2 className="h-6 w-6" />
            <span>ACADEMY</span>
          </Link>
          <Button
            variant="outline"
            size="icon"
            className="ml-auto h-8 w-8"
            aria-label="Notificaciones"
          >
            <Bell className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex-1 overflow-auto">
          <SideNav links={adminLinks} />
        </div>
      </div>
    </div>
  );
};
