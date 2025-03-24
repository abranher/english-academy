"use client";

import { Level, Student, User } from "@/types/models";
import { Avatar } from "@heroui/react";
import { assetImg } from "@/libs/asset";
import { formatDateShort } from "@/libs/date";
import Avvvatars from "avvvatars-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import { CalendarDays } from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/shadcn/ui/alert-dialog";
import { LevelBadge } from "@/components/student/BadgeLevel";

export function ProfileCard({
  userStudent,
}: {
  userStudent: User & { student: Student & { level: Level } };
}) {
  return (
    <section className="lg:col-span-3">
      <Card className="w-full">
        <CardHeader>
          <section className="flex justify-end">
            <LevelBadge level="C2">
              {userStudent.student.level.levelCode} -{" "}
              {userStudent.student.level.title}
            </LevelBadge>
          </section>
          <section className="w-full flex flex-col items-center justify-center gap-2">
            <article className="w-full flex items-center">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  {userStudent.avatarUrl ? (
                    <Avatar
                      isBordered
                      className="w-24 h-24 cursor-pointer"
                      color="default"
                      src={assetImg(userStudent.avatarUrl)}
                    />
                  ) : (
                    <Avatar
                      isBordered
                      className="w-24 h-24 cursor-pointer"
                      color="default"
                      icon={<Avvvatars size={100} value={userStudent.email} />}
                    />
                  )}
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Imagen de perfil</AlertDialogTitle>
                    <section className="flex justify-center pt-4">
                      {userStudent.avatarUrl ? (
                        <Avatar
                          isBordered
                          className="w-52 h-52"
                          color="default"
                          src={assetImg(userStudent.avatarUrl)}
                        />
                      ) : (
                        <Avatar
                          isBordered
                          className="w-52 h-52"
                          color="default"
                          icon={
                            <Avvvatars size={215} value={userStudent.email} />
                          }
                        />
                      )}
                    </section>
                    <section className="pt-5 flex justify-end gap-3">
                      <AlertDialogCancel>Cerrar</AlertDialogCancel>
                    </section>
                  </AlertDialogHeader>
                </AlertDialogContent>
              </AlertDialog>
            </article>
          </section>
        </CardHeader>
        <CardContent>
          <section className="flex flex-col gap-3">
            <article className="flex gap-2 flex-col">
              <CardTitle className="flex gap-2 items-center">
                <span>{`${userStudent.name} ${userStudent.lastName}`}</span>
              </CardTitle>

              <CardDescription className="flex gap-2 items-center">
                @{userStudent.username}
              </CardDescription>
            </article>

            <article>
              <CardDescription className="flex gap-2 items-center">
                0 Cursos
              </CardDescription>
            </article>

            <article>
              <CardDescription className="flex gap-2 items-center">
                De venezuela
              </CardDescription>
            </article>

            <article>
              <CardDescription className="flex gap-2 items-center">
                <CalendarDays className="w-4" />
                {formatDateShort(userStudent.createdAt)}
              </CardDescription>
            </article>
          </section>
        </CardContent>
      </Card>
    </section>
  );
}
