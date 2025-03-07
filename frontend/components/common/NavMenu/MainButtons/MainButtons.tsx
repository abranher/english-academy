"use client";

import Link from "next/link";

import { signOut, useSession } from "next-auth/react";
import { Avatar, NavbarContent, NavbarItem } from "@heroui/react";
import Avvvatars from "avvvatars-react";

import { Button } from "@/components/shadcn/ui/button";
import {
  CircleUser,
  CreditCard,
  LogOut,
  Mail,
  MessageSquare,
  PlusCircle,
  Settings,
  ShoppingCart,
  UserPlus,
  Users,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/shadcn/ui/dropdown-menu";
import { NotificationsDropdown } from "./NotificationsDropdown";
import { ThemeSwitcher } from "./ThemeSwitcher";

export function MainButtons() {
  const { data: session, status } = useSession();

  return (
    <>
      <NavbarContent as="div" justify="end">
        {status === "authenticated" ? (
          <>
            <NavbarItem>
              <Link href="/cart">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                  type="button"
                >
                  <ShoppingCart className="w-5 h-5" />
                </Button>
              </Link>
            </NavbarItem>

            <NavbarItem>
              <NotificationsDropdown userId={session.user.id} />
            </NavbarItem>

            <NavbarItem>
              <ThemeSwitcher />
            </NavbarItem>

            <NavbarItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar
                    isBordered
                    className="h-8 w-8 cursor-pointer"
                    color="default"
                    icon={<Avvvatars size={40} value={session.user.email} />}
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <section className="flex flex-col items-center p-4">
                    <Avatar
                      isBordered
                      className="h-24 w-24"
                      color="default"
                      icon={<Avvvatars size={100} value={session.user.email} />}
                    />
                    <h2 className="pt-2 text-lg font-semibold">
                      {session.user.name}
                    </h2>
                    <h2 className="text-sm text-gray-600">
                      {session.user.email}
                    </h2>
                  </section>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                      <Link href="/tutor/profile">
                        <CircleUser className="mr-2 h-4 w-4" />
                        Perfil
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <CreditCard className="mr-2 h-4 w-4" />
                      Facturación
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/student/settings">
                        <Settings className="mr-2 h-4 w-4" />
                        Configuración
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>

                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <Users className="mr-2 h-4 w-4" />
                      <span>Team</span>
                    </DropdownMenuItem>
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>
                        <UserPlus className="mr-2 h-4 w-4" />
                        <span>Invite users</span>
                      </DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                          <DropdownMenuItem>
                            <Mail className="mr-2 h-4 w-4" />
                            <span>Email</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <MessageSquare className="mr-2 h-4 w-4" />
                            <span>Message</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            <span>More...</span>
                          </DropdownMenuItem>
                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => {
                      signOut({ callbackUrl: "/" });
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Cerrar sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </NavbarItem>
          </>
        ) : (
          <>
            <NavbarItem>
              <Link href="/cart">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                  type="button"
                >
                  <ShoppingCart className="w-5 h-5" />
                </Button>
              </Link>
            </NavbarItem>

            <NavbarItem>
              <ThemeSwitcher />
            </NavbarItem>

            <NavbarItem className="hidden md:flex">
              <Link href="/students/signin">
                <Button color="default" type="button" variant="ghost">
                  Iniciar sesión
                </Button>
              </Link>
            </NavbarItem>

            <NavbarItem className="hidden sm:flex">
              <Link href="/students/signup">
                <Button color="primary" type="button">
                  Crear cuenta
                </Button>
              </Link>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
    </>
  );
}
