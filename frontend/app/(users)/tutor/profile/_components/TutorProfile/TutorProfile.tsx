"use client";

import { useQuery } from "@tanstack/react-query";
import { Avatar } from "@nextui-org/react";
import { getUserTutor } from "../../_services/get-user-tutor";
import { assetAttachments, assetImg } from "@/libs/asset";
import { User } from "@/types/models/User";
import { formatDateShort } from "@/libs/date";

import { StatusManagementHistory } from "../StatusManagementHistory";
import { BiographyCard } from "../BiographyCard";
import { CertificationsCard } from "../CertificationsCard";
import { AccountDetails } from "../AccountDetails";
import { TutorProfileSkeleton } from "./TutorProfileSkeleton";

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
import Avvvatars from "avvvatars-react";

export function TutorProfile({ userId }: { userId: string }) {
  const { isPending, data: userTutor } = useQuery<User>({
    queryKey: ["tutor-user-profile"],
    queryFn: () => getUserTutor(userId as string),
  });

  if (isPending) return <TutorProfileSkeleton />;
  if (!userTutor) return <div>No se pudo cargar la información.</div>;

  return (
    <>
      <section className="flex flex-col gap-1">
        <CardTitle>Perfil de usuario</CardTitle>
        <CardDescription>
          Accede a tu información personal, actualiza tus datos y gestiona tus
          preferencias.
        </CardDescription>
      </section>

      <section className="w-full grid grid-cols-1 lg:grid-cols-7 gap-4">
        <section className="lg:col-span-2">
          <Card className="w-full">
            <CardHeader className="flex flex-col items-center p-6">
              <section className="w-full flex justify-end">
                <StatusBadge status={userTutor.tutor!.status} />
              </section>

              <section className="w-full flex flex-col items-center justify-center gap-2">
                <article className="w-full flex items-center">
                  {userTutor.avatarUrl ? (
                    <Avatar
                      isBordered
                      className="w-24 h-24"
                      color="default"
                      src={assetImg(userTutor.avatarUrl)}
                    />
                  ) : (
                    <Avatar
                      isBordered
                      className="w-24 h-24"
                      color="default"
                      icon={<Avvvatars size={100} value={userTutor.email} />}
                    />
                  )}
                </article>
              </section>
            </CardHeader>
            <CardContent>
              <section className="flex flex-col gap-3">
                <article className="flex gap-2 flex-col">
                  <CardTitle className="flex gap-2 items-center">
                    {`${userTutor.name} ${userTutor.lastName}`}
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
                  <Button
                    asChild
                    className="w-full"
                    aria-label="Ver currículum"
                  >
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

        <section className="lg:col-span-5 gap-3 flex flex-col">
          <BiographyCard bio={userTutor.tutor!.bio} />
          <AccountDetails email={userTutor.email} birth={userTutor.birth} />
          <CertificationsCard
            certifications={userTutor.tutor!.certifications}
          />
          <StatusManagementHistory
            tutorStatusHistory={userTutor.tutor!.tutorStatusHistory}
          />
        </section>
      </section>
    </>
  );
}
