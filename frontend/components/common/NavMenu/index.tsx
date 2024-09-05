"use client";

import { useState } from "react";
import {
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Dropdown,
  DropdownTrigger,
  Avatar,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";
import NextLink from "next/link";
import { ThemeSwitcher } from "../ThemeSwitcher";
import { usePathname } from "next/navigation";
import { Button } from "../../shadcn/ui/button";
import Logo from "./Logo";
import MainLinks from "./MainLinks";

export default function NavMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session, status } = useSession();

  const pathname = usePathname();

  const menuItems = ["Cursos", "Tutores", "Contacto"];

  return (
    <>
      <Navbar onMenuOpenChange={setIsMenuOpen} isBordered maxWidth="2xl">
        <NavbarContent justify="start">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Cerrar menu" : "Abrir menu"}
            className="sm:hidden"
          />

          <Logo />

          <MainLinks />
        </NavbarContent>

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

            <NavbarItem>
              <ThemeSwitcher />
            </NavbarItem>
          </NavbarContent>
        ) : (
          <NavbarContent justify="end">
            <NavbarItem className="hidden md:flex">
              <NextLink href="/student/signin">
                <Button color="default" type="button" variant="ghost">
                  Iniciar sesión
                </Button>
              </NextLink>
            </NavbarItem>

            <NavbarItem className="hidden sm:flex">
              <NextLink href="/student/signup">
                <Button color="primary" type="button">
                  Crear cuenta
                </Button>
              </NextLink>
            </NavbarItem>

            <NavbarItem>
              <ThemeSwitcher />
            </NavbarItem>
          </NavbarContent>
        )}
        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === menuItems.length - 1
                    ? "danger"
                    : "foreground"
                }
                className="w-full"
                href="#"
                size="lg"
              >
                {item}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    </>
  );
}
