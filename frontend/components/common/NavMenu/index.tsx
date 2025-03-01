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
} from "@nextui-org/react";
import { ThemeSwitcher } from "../ThemeSwitcher";
import { MainLinks } from "./MainLinks";
import { DropdownAuth } from "./DropdownAuth";

export default function NavMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = ["Cursos", "Tutores", "Contacto"];

  return (
    <>
      <Navbar onMenuOpenChange={setIsMenuOpen} isBordered maxWidth="2xl">
        <NavbarContent justify="start">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Cerrar menu" : "Abrir menu"}
            className="sm:hidden"
          />
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
