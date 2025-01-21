"use client";

import Link from "next/link";

import {
  Bell,
  ClipboardList,
  DatabaseBackup,
  GraduationCap,
  Home,
  Package2,
} from "lucide-react";
import { Button } from "@/components/shadcn/ui/button";
import SideNav from "@/components/common/SideNav";

export default function AsideAdmin() {
  return (
    <>
      <div className="hidden border-r dark:border-zinc-800 bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b dark:border-zinc-800 px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6" />
              <span className="">ACADEMY</span>
            </Link>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1">
            <SideNav
              links={[
                {
                  title: "Dashboard",
                  href: "/admin",
                  icon: Home,
                },
                {
                  title: "Cursos",
                  href: "/admin/courses",
                  icon: GraduationCap,
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
              ]}
            />
          </div>
        </div>
      </div>
    </>
  );
}
