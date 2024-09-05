"use client";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
} from "@nextui-org/react";
import { ThemeSwitcher } from "../ThemeSwitcher";
import Logo from "./Logo";
import MainLinks from "./MainLinks";
import DropdownAuth from "./DropdownAuth";

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

        <DropdownAuth />
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
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
