import NextLink from "next/link";

import { NavbarContent, Link, NavbarItem } from "@nextui-org/react";

export default function MainLinks() {
  return (
    <>
      <NavbarContent className="hidden sm:flex gap-3">
        <NavbarItem>
          <Link as={NextLink} color="foreground" href="/">
            Inicio
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/home/courses">
            Cursos
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page" color="foreground">
            Tutores
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Contacto
          </Link>
        </NavbarItem>
      </NavbarContent>
    </>
  );
}
