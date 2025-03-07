"use client";

import { User } from "@/types/models/User";
import { Avatar } from "@heroui/react";
import { assetAttachments, assetImg } from "@/libs/asset";
import { formatDateShort } from "@/libs/date";
import Avvvatars from "avvvatars-react";

import { Button } from "@/components/shadcn/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import { CalendarDays, FileText } from "lucide-react";
import { StatusBadge } from "@/components/tutors/StatusBadge";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/shadcn/ui/alert-dialog";

export function TutorProfileCard({ userTutor }: { userTutor: User }) {
  return (
    <>
      <section className="lg:col-span-2">
        <Card className="w-full">
          <CardHeader className="flex flex-col items-center p-6">
            <section className="w-full flex justify-end">
              <StatusBadge status={userTutor.tutor!.status} />
            </section>

            <section className="w-full flex flex-col items-center justify-center gap-2">
              <article className="w-full flex items-center">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    {userTutor.avatarUrl ? (
                      <Avatar
                        isBordered
                        className="w-24 h-24 cursor-pointer"
                        color="default"
                        src={assetImg(userTutor.avatarUrl)}
                      />
                    ) : (
                      <Avatar
                        isBordered
                        className="w-24 h-24 cursor-pointer"
                        color="default"
                        icon={<Avvvatars size={100} value={userTutor.email} />}
                      />
                    )}
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Imagen de perfil</AlertDialogTitle>
                      <section className="flex justify-center pt-4">
                        {userTutor.avatarUrl ? (
                          <Avatar
                            isBordered
                            className="w-52 h-52"
                            color="default"
                            src={assetImg(userTutor.avatarUrl)}
                          />
                        ) : (
                          <Avatar
                            isBordered
                            className="w-52 h-52"
                            color="default"
                            icon={
                              <Avvvatars size={215} value={userTutor.email} />
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
                  <span>{`${userTutor.name} ${userTutor.lastName}`}</span>
                </CardTitle>

                <CardDescription className="flex gap-2 items-center">
                  @{userTutor.username}
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
                  {formatDateShort(userTutor.createdAt)}
                </CardDescription>
              </article>

              {userTutor.tutor!.cvUrl && (
                <Button asChild className="w-full" aria-label="Ver currículum">
                  <a
                    href={assetAttachments(userTutor.tutor!.cvUrl)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    currículum
                  </a>
                </Button>
              )}
            </section>
          </CardContent>
        </Card>
      </section>
    </>
  );
}
