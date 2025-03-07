"use client";

import Link from "next/link";

import axios from "@/config/axios";
import { useMutation } from "@tanstack/react-query";
import { Notification } from "@/types/models/Notification";
import { formatDateForHumans } from "@/libs/date";

import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/shadcn/ui/dropdown-menu";
import { Clock } from "lucide-react";

export function NotificationItem({
  notification,
}: {
  notification: Notification;
}) {
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
