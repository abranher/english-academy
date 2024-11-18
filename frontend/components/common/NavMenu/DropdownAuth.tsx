"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/shadcn/ui/button";
import {
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
import Avvvatars from "avvvatars-react";
import { NavbarContent, NavbarItem } from "@nextui-org/react";
import { Avatar } from "@/components/shadcn/ui/avatar";

export default function DropdownAuth() {
  const { data: session, status } = useSession();

  return (
    <>
      <NavbarContent as="div" justify="end">
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

        {status === "authenticated" ? (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="flex items-center justify-center h-10 w-10 cursor-pointer">
                  <Avvvatars size={40} value={session.user.email} />
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex flex-col items-center p-6">
                  <Avatar className="flex items-center justify-center h-24 w-24">
                    <Avvvatars size={80} value={session.user.email} />
                  </Avatar>
                  <p className="pt-2 text-lg font-semibold">
                    {session.user.name}
                  </p>
                  <p className="text-sm text-gray-600">{session.user.email}</p>
                  <div className="mt-5">
                    <Link
                      href="#"
                      className="border border-zinc-400 dark:border-zinc-800 rounded-full py-2 px-4 text-xs font-semibold text-gray-700 dark:text-zinc-50"
                    >
                      Administra tu cuenta
                    </Link>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <CreditCard className="mr-2 h-4 w-4" />
                    Facturación
                  </DropdownMenuItem>
                  <Link href="/student/settings">
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      Configuración
                    </DropdownMenuItem>
                  </Link>
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
          </>
        ) : (
          <>
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
