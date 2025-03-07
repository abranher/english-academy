"use client";

import Link from "next/link";

import { getUserNotifications } from "@/services/network/notifications/get-user-notifications";
import { useQuery } from "@tanstack/react-query";

import { Button } from "@/components/shadcn/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/shadcn/ui/dropdown-menu";
import { Skeleton } from "@/components/shadcn/ui/skeleton";
import { Bell, CircleUser, Eye } from "lucide-react";
import { DropdownMenuError } from "./DropdownMenuError";

export function NotificationsDropdown({ userId }: { userId: string }) {
  const {
    isPending,
    data: notifications,
    isError,
  } = useQuery<Notification[]>({
    queryKey: ["get-user-notifications"],
    queryFn: () => getUserNotifications(userId),
  });

  if (isError) return <DropdownMenuError />;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            type="button"
          >
            <Bell className="w-5 h-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-72" align="end" forceMount>
          <DropdownMenuLabel className="text-center">
            Notificaciones
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          {isPending ? (
            <>
              {[1, 2, 3].map((item) => (
                <>
                  <DropdownMenuItem key={item} asChild>
                    <Skeleton className="h-16" />
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                </>
              ))}
            </>
          ) : (
            <>
              {notifications.map((notification) => (
                <>
                  <DropdownMenuItem asChild>
                    <Link href="/tutor/profile">
                      <CircleUser className="mr-2 h-4 w-4" />
                      Perfil
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                </>
              ))}
            </>
          )}

          <DropdownMenuItem asChild>
            <Link
              href="/student/settings"
              className="flex gap-2 justify-center"
            >
              <Eye className="w-4" />
              Ver todas
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
