"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getUserTutor } from "../../_services/get-all-tutors";
import {
  BadgeAlert,
  BadgeCheck,
  BookmarkCheck,
  BookUser,
  CircleUser,
  Eye,
  FileText,
  GraduationCap,
  History,
  Mail,
  Menu,
  School,
} from "lucide-react";
import { Button } from "@/components/shadcn/ui/button";
import { Avatar } from "@nextui-org/react";
import { assetAttachments, assetImg } from "@/libs/asset";
import { Badge } from "@/components/shadcn/ui/badge";
import { Certification } from "@/types/models/Certification";
import { TutorStatus } from "@/types/enums/TutorStatus";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/shadcn/ui/dropdown-menu";

export function TutorProfile() {
  const { userId } = useParams();

  const { isPending, data: userTutor } = useQuery({
    queryKey: ["tutor-admin-profile"],
    queryFn: () => getUserTutor(userId as string),
  });

  console.log(userTutor);

  if (isPending) return <div>Cargando...</div>;

  return (
    <>
      <section className="flex justify-between">
        <article>
          <CardTitle>Tutor</CardTitle>
          <CardDescription>Datos del Tutor</CardDescription>
        </article>

        <article>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">
                <Menu />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Estado del tutor</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>Aprobar</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </article>
      </section>

      <section className="grid grid-cols-7 gap-4">
        <Card className="col-span-2">
          <CardHeader className="flex flex-col items-center p-6">
            <section className="w-full flex justify-end">
              {userTutor.tutor.status === TutorStatus.PENDING && (
                <Badge
                  className="flex gap-1 items-center"
                  variant="destructive"
                >
                  <BadgeAlert />
                  Sin verificar
                </Badge>
              )}
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
                  {`${userTutor.name} ${userTutor.lastName}` ||
                    "Nombre no disponible"}
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

              <article className="py-4">
                <a
                  href={assetAttachments(userTutor.tutor.cvUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="flex items-center gap-2" size="sm">
                    <FileText />
                    Currículum
                  </Button>
                </a>
              </article>
            </section>
          </CardContent>
        </Card>

        <section className="col-span-5 gap-3 flex flex-col">
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="flex gap-3 items-center">
                Biografía
                <BookUser />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <section className="flex flex-col gap-5">
                <article>{userTutor.tutor.bio}</article>
              </section>
            </CardContent>
          </Card>

          <Card className="w-full">
            <CardHeader>
              <CardTitle className="flex gap-3 items-center">
                Datos de la cuenta
                <CircleUser />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <section className="flex flex-col gap-5">
                <article className="flex flex-col gap-3">
                  <p className="flex gap-3 items-center">
                    <Mail />
                    {userTutor.email}
                    <Badge className="flex gap-1 items-center">
                      <BadgeCheck />
                      Verificado
                    </Badge>
                  </p>
                </article>
              </section>
            </CardContent>
          </Card>

          <Card className="w-full">
            <CardHeader>
              <CardTitle className="flex gap-3 items-center">
                Certificaciones
                <GraduationCap />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <section className="flex flex-col gap-5">
                <article className="flex flex-col gap-3">
                  {userTutor.tutor.certifications.length === 0 ? (
                    <>
                      <CardDescription>
                        No registro certificaciones
                      </CardDescription>
                    </>
                  ) : (
                    userTutor.tutor?.certifications.map(
                      (certification: Certification) => (
                        <section
                          key={certification.id}
                          className="flex items-center justify-between rounded-lg border p-4 dark:border-zinc-700"
                        >
                          <div className="space-y-2">
                            <h3 className="font-medium flex gap-1 items-center">
                              <BookmarkCheck />
                              Nombre: {certification.name}
                            </h3>
                            <p className="text-sm text-muted-foreground flex gap-1 items-center">
                              <School />
                              Organismo emisor:{" "}
                              {certification.issuingOrganization}
                            </p>
                          </div>

                          <section className="flex gap-3">
                            <a
                              href={assetAttachments(certification.url)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2"
                            >
                              <Button size="sm">
                                <Eye />
                              </Button>
                            </a>
                          </section>
                        </section>
                      )
                    )
                  )}
                </article>
              </section>
            </CardContent>
          </Card>

          <Card className="w-full">
            <CardHeader>
              <CardTitle className="flex gap-3 items-center">
                Historial de Aprobaciones y Rechazos
                <History />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <section className="flex flex-col gap-5">
                <article className="flex flex-col gap-3">
                  {userTutor.tutor.certifications.length === 0 ? (
                    <>
                      <CardDescription>
                        No registro certificaciones
                      </CardDescription>
                    </>
                  ) : (
                    userTutor.tutor?.certifications.map(
                      (certification: Certification) => (
                        <section
                          key={certification.id}
                          className="flex items-center justify-between rounded-lg border p-4 dark:border-zinc-700"
                        >
                          <div className="space-y-2">
                            <h3 className="font-medium flex gap-1 items-center">
                              <BookmarkCheck />
                              Nombre: {certification.name}
                            </h3>
                            <p className="text-sm text-muted-foreground flex gap-1 items-center">
                              <School />
                              Organismo emisor:{" "}
                              {certification.issuingOrganization}
                            </p>
                          </div>

                          <section className="flex gap-3">
                            <a
                              href={assetAttachments(certification.url)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2"
                            >
                              <Button size="sm">
                                <Eye />
                              </Button>
                            </a>
                          </section>
                        </section>
                      )
                    )
                  )}
                </article>
              </section>
            </CardContent>
          </Card>
        </section>
      </section>
    </>
  );
}
