"use client";

import Link from "next/link";

import { getUserNotifications } from "@/services/network/notifications/get-user-notifications";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Notification } from "@/types/models/Notification";
import { formatDateForHumans } from "@/libs/date";

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
import { Bell, Clock, Eye } from "lucide-react";
import { DropdownMenuError } from "./DropdownMenuError";
import axios from "@/config/axios";

export function NotificationsDropdown({ userId }: { userId: string }) {
  const {
    isPending,
    data: notifications,
    isError,
  } = useQuery<Notification[] | []>({
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
                  {notifications.map((notification: Notification) => (
                    <>
                      <NotificationItem notification={notification} />
                    </>
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

function NotificationItem({ notification }: { notification: Notification }) {
  const createMutation = useMutation({
    mutationFn: () => axios.get(`/api/notifications/${notification.id}`),
  });

  return (
    <>
      <DropdownMenuItem
        className={
          notification.readAt === null
            ? "bg-zinc-200 dark:bg-zinc-900"
            : undefined
        }
        asChild
      >
        <Link
          href={notification.data.path}
          onClick={() => {
            if (notification.readAt === null) {
              createMutation.mutate();
            }
          }}
        >
          <section className="flex flex-col gap-1 font-semibold">
            <article>
              <h2 className="font-bold">{notification.data.heading}</h2>
              <p className="font-semibold text-sm text-zinc-500 dark:text-zinc-400">
                {notification.data.message}
              </p>
            </article>
            <p className="text-sm text-sky-600 flex gap-2 items-center">
              <Clock className="w-3" />
              {formatDateForHumans(notification.createdAt)}
            </p>
          </section>
        </Link>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
    </>
  );
}
