"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/shadcn/ui/button";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";

export default function DropdownAuth() {
  const { data: session, status } = useSession();

  return (
    <>
      {status === "authenticated" ? (
        <NavbarContent as="div" justify="end">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name="Jason Hughes"
                size="sm"
                src="/users/person2.png"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Iniciaste como</p>
                <p className="font-semibold">{session.user.email}</p>
              </DropdownItem>
              <DropdownItem key="settings">Perfil</DropdownItem>
              <DropdownItem key="team_settings">Team Settings</DropdownItem>
              <DropdownItem key="system">System</DropdownItem>
              <DropdownItem key="configurations">Configurations</DropdownItem>
              <DropdownItem
                key="logout"
                color="danger"
                onClick={() => {
                  signOut({ callbackUrl: "/student/auth/signin" });
                }}
              >
                Cerrar sesión
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      ) : (
        <NavbarContent justify="end">
          <NavbarItem className="hidden md:flex">
            <Link href="/student/signin">
              <Button color="default" type="button" variant="ghost">
                Iniciar sesión
              </Button>
            </Link>
          </NavbarItem>

          <NavbarItem className="hidden sm:flex">
            <Link href="/student/signup">
              <Button color="primary" type="button">
                Crear cuenta
              </Button>
            </Link>
          </NavbarItem>
        </NavbarContent>
      )}
    </>
  );
}
