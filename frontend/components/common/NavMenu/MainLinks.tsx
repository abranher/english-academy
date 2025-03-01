import NextLink from "next/link";

import { useSession } from "next-auth/react";
import { NavbarContent, Link, NavbarItem } from "@nextui-org/react";

import { AcmeLogo } from "@/components/icons/AcmeLogo";
import { Roles } from "@/types/enums";

export function MainLinks() {
  const { data: session, status } = useSession();

  console.log(session?.user.role);

  return (
    <>
      <NavbarContent className="hidden sm:flex gap-3">
        <NavbarItem className="flex items-center">
          <AcmeLogo />
          <NextLink href="/" className="font-bold text-inherit hidden md:block">
            ACADEMY
          </NextLink>
        </NavbarItem>
        {status === "authenticated" ? (
          <>
            {session.user.role === Roles.TUTOR && (
              <>
                <NavbarItem className="ml-3" isActive>
                  <Link
                    as={NextLink}
                    color="foreground"
                    href="/tutor/dashboard"
                  >
                    Dashboard
                  </Link>
                </NavbarItem>
                <NavbarItem>
                  <Link as={NextLink} color="foreground" href="/tutor/courses">
                    Mis Cursos
                  </Link>
                </NavbarItem>
                <NavbarItem>
                  <Link as={NextLink} color="foreground" href="#">
                    Contacto
                  </Link>
                </NavbarItem>
              </>
            )}
            {session.user.role === Roles.STUDENT && (
              <>
                <NavbarItem className="ml-3">
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
              </>
            )}
          </>
        ) : (
          <>
            <NavbarItem className="ml-3">
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
          </>
        )}
      </NavbarContent>
    </>
  );
}
