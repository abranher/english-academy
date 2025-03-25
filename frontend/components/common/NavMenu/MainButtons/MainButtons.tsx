"use client";

import Link from "next/link";

import Avvvatars from "avvvatars-react";
import { Roles } from "@/types/enums";
import { assetImg } from "@/libs/asset";
import { signOut, useSession } from "next-auth/react";
import { Avatar, NavbarContent, NavbarItem } from "@heroui/react";

import { NotificationsDropdown } from "./NotificationsDropdown";
import { ThemeSwitcher } from "./ThemeSwitcher";

import { Button } from "@/components/shadcn/ui/button";
import {
  Award,
  BookMarked,
  CircleUser,
  CreditCard,
  Files,
  Home,
  LogOut,
  Mail,
  MessageSquare,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  UserSquare,
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

export function MainButtons() {
  const { data: session, status } = useSession();

  return (
    <>
      <NavbarContent as="div" justify="end">
        {status === "authenticated" ? (
          <>
            {session.user.role === Roles.ADMIN && (
              <>
                <NavbarItem>
                  <NotificationsDropdown userId={session.user.id} />
                </NavbarItem>

                <NavbarItem>
                  <ThemeSwitcher />
                </NavbarItem>

                <NavbarItem>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      {session.user.avatarUrl ? (
                        <Avatar
                          isBordered
                          className="h-8 w-8 cursor-pointer"
                          color="default"
                          src={assetImg(session.user.avatarUrl)}
                        />
                      ) : (
                        <Avatar
                          isBordered
                          className="h-8 w-8 cursor-pointer"
                          color="default"
                          icon={
                            <Avvvatars size={40} value={session.user.email} />
                          }
                        />
                      )}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-64"
                      align="end"
                      forceMount
                    >
                      <section className="flex flex-col items-center p-4">
                        {session.user.avatarUrl ? (
                          <Avatar
                            isBordered
                            className="w-24 h-24 cursor-pointer"
                            color="default"
                            src={assetImg(session.user.avatarUrl)}
                          />
                        ) : (
                          <Avatar
                            isBordered
                            className="w-24 h-24 cursor-pointer"
                            color="default"
                            icon={
                              <Avvvatars
                                size={100}
                                value={session.user.email}
                              />
                            }
                          />
                        )}
                        <section className="py-2 flex flex-col items-center">
                          <h2 className="text-lg font-semibold">
                            {session.user.name}
                          </h2>
                          <Button variant="link" asChild className="h-0">
                            <Link href="/tutor/profile">
                              @{session.user.username}
                            </Link>
                          </Button>
                        </section>
                      </section>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem asChild>
                          <Link href="/admin">
                            <Home className="mr-2 h-4 w-4" />
                            Dashboard
                          </Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem asChild>
                          <Link href="/admin/courses">
                            <Award className="mr-2 h-4 w-4" />
                            Cursos
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>

                      <DropdownMenuSeparator />

                      <DropdownMenuGroup>
                        <DropdownMenuItem asChild>
                          <Link href="/student/settings">
                            <Settings className="mr-2 h-4 w-4" />
                            Configuración
                          </Link>
                        </DropdownMenuItem>
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
            )}

            {session.user.role === Roles.TUTOR && (
              <>
                <NavbarItem>
                  <NotificationsDropdown userId={session.user.id} />
                </NavbarItem>

                <NavbarItem>
                  <ThemeSwitcher />
                </NavbarItem>

                <NavbarItem>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      {session.user.avatarUrl ? (
                        <Avatar
                          isBordered
                          className="h-8 w-8 cursor-pointer"
                          color="default"
                          src={assetImg(session.user.avatarUrl)}
                        />
                      ) : (
                        <Avatar
                          isBordered
                          className="h-8 w-8 cursor-pointer"
                          color="default"
                          icon={
                            <Avvvatars size={40} value={session.user.email} />
                          }
                        />
                      )}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-64"
                      align="end"
                      forceMount
                    >
                      <section className="flex flex-col items-center p-4">
                        {session.user.avatarUrl ? (
                          <Avatar
                            isBordered
                            className="w-24 h-24 cursor-pointer"
                            color="default"
                            src={assetImg(session.user.avatarUrl)}
                          />
                        ) : (
                          <Avatar
                            isBordered
                            className="w-24 h-24 cursor-pointer"
                            color="default"
                            icon={
                              <Avvvatars
                                size={100}
                                value={session.user.email}
                              />
                            }
                          />
                        )}
                        <section className="py-2 flex flex-col items-center">
                          <h2 className="text-lg font-semibold">
                            {session.user.name}
                          </h2>
                          <Button variant="link" asChild className="h-0">
                            <Link href="/tutor/profile">
                              @{session.user.username}
                            </Link>
                          </Button>
                        </section>
                      </section>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem asChild>
                          <Link href="/tutor/dashboard">
                            <Home className="mr-2 h-4 w-4" />
                            Dashboard
                          </Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem asChild>
                          <Link href="/tutor/courses">
                            <Award className="mr-2 h-4 w-4" />
                            Cursos
                          </Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem asChild>
                          <Link href="/tutor/attachments">
                            <Files className="mr-2 h-4 w-4" />
                            Recursos
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>

                      <DropdownMenuSeparator />

                      <DropdownMenuGroup>
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger>
                            <CircleUser className="mr-2 h-4 w-4" />
                            <span>Perfil</span>
                          </DropdownMenuSubTrigger>
                          <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                              <DropdownMenuItem asChild>
                                <Link href="/tutor/profile">
                                  <User className="mr-2 h-4 w-4" />
                                  De Usuario
                                </Link>
                              </DropdownMenuItem>

                              <DropdownMenuItem asChild>
                                <Link href="/tutor/payment-profile">
                                  <UserSquare className="mr-2 h-4 w-4" />
                                  De Pago
                                </Link>
                              </DropdownMenuItem>
                            </DropdownMenuSubContent>
                          </DropdownMenuPortal>
                        </DropdownMenuSub>

                        <DropdownMenuItem>
                          <CreditCard className="mr-2 h-4 w-4" />
                          Facturación
                        </DropdownMenuItem>

                        <DropdownMenuItem asChild>
                          <Link href="/tutor/subscription-orders">
                            <BookMarked className="mr-2 h-4 w-4" />
                            Mis Órdenes de Suscripción
                          </Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem asChild>
                          <Link href="/student/settings">
                            <Settings className="mr-2 h-4 w-4" />
                            Configuración
                          </Link>
                        </DropdownMenuItem>
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
            )}

            {session.user.role === Roles.STUDENT && (
              <>
                <NavbarItem>
                  <NotificationsDropdown userId={session.user.id} />
                </NavbarItem>

                <NavbarItem>
                  <ThemeSwitcher />
                </NavbarItem>

                <NavbarItem>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      {session.user.avatarUrl ? (
                        <Avatar
                          isBordered
                          className="h-8 w-8 cursor-pointer"
                          color="default"
                          src={assetImg(session.user.avatarUrl)}
                        />
                      ) : (
                        <Avatar
                          isBordered
                          className="h-8 w-8 cursor-pointer"
                          color="default"
                          icon={
                            <Avvvatars size={40} value={session.user.email} />
                          }
                        />
                      )}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-64"
                      align="end"
                      forceMount
                    >
                      <section className="flex flex-col items-center p-4">
                        {session.user.avatarUrl ? (
                          <Avatar
                            isBordered
                            className="w-24 h-24 cursor-pointer"
                            color="default"
                            src={assetImg(session.user.avatarUrl)}
                          />
                        ) : (
                          <Avatar
                            isBordered
                            className="w-24 h-24 cursor-pointer"
                            color="default"
                            icon={
                              <Avvvatars
                                size={100}
                                value={session.user.email}
                              />
                            }
                          />
                        )}
                        <section className="py-2 flex flex-col items-center">
                          <h2 className="text-lg font-semibold">
                            {session.user.name}
                          </h2>
                          <Button variant="link" asChild className="h-0">
                            <Link href="/tutor/profile">
                              @{session.user.username}
                            </Link>
                          </Button>
                        </section>
                      </section>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem asChild>
                          <Link href="/student/home">
                            <Home className="mr-2 h-4 w-4" />
                            Home
                          </Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem asChild>
                          <Link href="/tutor/courses">
                            <Award className="mr-2 h-4 w-4" />
                            Cursos
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>

                      <DropdownMenuSeparator />

                      <DropdownMenuGroup>
                        <DropdownMenuItem asChild>
                          <Link href="/tutor/profile">
                            <CircleUser className="mr-2 h-4 w-4" />
                            Perfil
                          </Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem asChild>
                          <Link href="/student/settings">
                            <Settings className="mr-2 h-4 w-4" />
                            Configuración
                          </Link>
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
            )}
          </>
        ) : (
          <>
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
