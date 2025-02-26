"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { getUserTutor } from "../../_services/get-all-tutors";
import { assetAttachments, assetImg } from "@/libs/asset";
import { format } from "date-fns";
import { es } from "date-fns/locale";

import { StatusManagementHistory } from "../StatusManagementHistory";
import { BiographyCard } from "../BiographyCard";
import { CertificationsCard } from "../CertificationsCard";
import { AccountDetails } from "../AccountDetails";

import { Avatar } from "@nextui-org/react";
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

export function formatDate(isoDateString: string): string {
  const date = new Date(isoDateString);
  return format(date, "'Se unió en ' MMMM 'de' yyyy", {
    locale: es,
  });
}

export function TutorProfile() {
  const { isPending, data: userTutor } = useQuery({
    queryKey: ["tutor-admin-profile"],
    queryFn: () => getUserTutor(userId as string),
  });

  const { userId } = useParams();

  if (isPending) return <div>Cargando...</div>;

  return (
    <>
      <section>
        <CardTitle>Tutor</CardTitle>
        <CardDescription>Detalle de Tutor</CardDescription>
      </section>

      <section className="w-full grid grid-cols-1 lg:grid-cols-7 gap-4">
        <section className="lg:col-span-2">
          <Card className="w-full">
            <CardHeader className="flex flex-col items-center p-6">
              <section className="w-full flex justify-end">
                <StatusBadge status={userTutor.tutor.status} />
              </section>

              <section className="w-full flex flex-col items-center justify-center gap-2">
                <article className="w-full flex items-center">
                  <Avatar
                    isBordered
                    className="w-20 h-20"
                    color="default"
                    src={
                      assetImg(userTutor.avatarUrl) ||
                      "https://i.pravatar.cc/150?u=a042581f4e29026704d"
                    }
                  />
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
                    {formatDate(userTutor.createdAt)}
                  </CardDescription>
                </article>

                {userTutor.tutor.cvUrl && (
                  <Button
                    asChild
                    className="w-full"
                    aria-label="Ver currículum"
                  >
                    <a
                      href={assetAttachments(userTutor.tutor.cvUrl)}
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
          <BiographyCard bio={userTutor.tutor.bio} />

          <AccountDetails
            email={userTutor.email}
            birth={userTutor.birth}
            country={userTutor.country}
          />

          <CertificationsCard certifications={userTutor.tutor.certifications} />

          <StatusManagementHistory
            rejectionHistory={userTutor.tutor.rejectionHistory}
          />
        </section>
      </section>
    </>
  );
}
