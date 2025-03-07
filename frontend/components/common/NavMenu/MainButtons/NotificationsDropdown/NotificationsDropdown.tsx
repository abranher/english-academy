"use client";

import Link from "next/link";

import { getUserNotifications } from "@/services/network/notifications/get-user-notifications";
import { useQuery } from "@tanstack/react-query";
import { Notification } from "@/types/models/Notification";

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
import { Bell, Eye } from "lucide-react";
import { DropdownMenuError } from "./DropdownMenuError";
import { NotificationItem } from "./NotificationItem";

const MIN_NOTIFICATIONS = 0;
const MAX_NOTIFICATIONS = 4;
const REFETCH_INTERVAL = 20000;

export function NotificationsDropdown({ userId }: { userId: string }) {
  const {
    isPending,
    data: notifications,
    isError,
  } = useQuery<Notification[] | []>({
    queryKey: ["get-user-notifications"],
    queryFn: () => getUserNotifications(userId),
    refetchInterval: REFETCH_INTERVAL,
  });

  if (isError) return <DropdownMenuError />;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="relative rounded-full"
            type="button"
          >
            <Bell className="w-5 h-5" />
            {!isPending && (
              <>
                {notifications.filter((ntf) => ntf.readAt === null).length !==
                  0 && (
                  <span className="absolute w-4 h-4 text-white bg-red-500 rounded-full top-0 right-0 flex justify-center items-center text-[10px]">
                    {notifications.filter((ntf) => ntf.readAt === null).length}
                  </span>
                )}
              </>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-80" align="end" forceMount>
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
              {notifications.length !== 0 ? (
                <>
                  {notifications
                    .slice(MIN_NOTIFICATIONS, MAX_NOTIFICATIONS)
                    .map((notification: Notification) => (
                      <NotificationItem
                        key={notification.id}
                        notification={notification}
                      />
                    ))}
                </>
              ) : (
                <>
                  <DropdownMenuLabel className="text-center">
                    Sin notificaciones
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                </>
              )}
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
