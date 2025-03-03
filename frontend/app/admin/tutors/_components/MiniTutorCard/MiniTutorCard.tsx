"use client";

import Link from "next/link";

import { assetImg } from "@/libs/asset";
import { User } from "@/types/models/User";
import { Avatar } from "@heroui/react";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import { StatusBadge } from "@/components/tutors/StatusBadge";
import { Button } from "@/components/shadcn/ui/button";
import { ArrowUpRight } from "lucide-react";
import Avvvatars from "avvvatars-react";

export function MiniTutorCard({ user }: { user: User }) {
  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center p-4">
          <section className="w-full flex flex-col items-center justify-center gap-3">
            <article className="w-full flex justify-center items-center">
              {user.avatarUrl ? (
                <Avatar
                  isBordered
                  className="w-24 h-24"
                  color="default"
                  src={assetImg(user.avatarUrl)}
                />
              ) : (
                <Avatar
                  isBordered
                  className="w-24 h-24"
                  color="default"
                  icon={<Avvvatars size={100} value={user.email} />}
                />
              )}
            </article>
            <div className="w-full flex flex-col justify-center items-center">
              <CardTitle className="text-lg font-semibold">
                {user.name || "Nombre no disponible"}
              </CardTitle>
              <CardDescription className="text-sm text-gray-500">
                @{user.username}
              </CardDescription>
            </div>
          </section>
        </CardHeader>
        <CardFooter className="flex flex-col gap-3 px-6">
          <StatusBadge status={user.tutor!.status} />
          <Link href={`/admin/tutors/${user.id}`}>
            <Button className="flex gap-3">
              Ver mas
              <ArrowUpRight className="opacity-90 w-5" />
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </>
  );
}
