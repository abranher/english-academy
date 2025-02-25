"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getUserTutor } from "../../_services/get-all-tutors";
import {
  ArrowUpRight,
  AtSign,
  BadgeCheck,
  BookUser,
  CircleUser,
  GraduationCap,
  Mail,
  SquareUser,
  User,
} from "lucide-react";
import { Button } from "@/components/shadcn/ui/button";
import { Avatar } from "@nextui-org/react";
import { assetImg } from "@/libs/asset";
import { Badge } from "@/components/shadcn/ui/badge";

export function TutorProfile() {
  const { userId } = useParams();

  const { isPending, data: userTutor } = useQuery({
    queryKey: ["tutor-admin-profile"],
    queryFn: () => getUserTutor(userId as string),
  });

  console.log(userTutor);
  if (isPending)
    return (
      <>
        <div>Cargando...</div>
      </>
    );

  return (
    <>
      <div>
        <CardTitle>Tutor</CardTitle>
        <CardDescription>Datos del Tutor</CardDescription>
      </div>

      <section className="grid grid-cols-7 gap-4">
        <Card className="col-span-2">
          <CardHeader className="flex flex-col items-center p-6">
            <section className="w-full flex justify-end">
              <Badge className="flex gap-1 items-center">
                <BadgeCheck />
                Verificado
              </Badge>
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
            </section>
          </CardContent>
          <CardFooter className="flex justify-end px-6"></CardFooter>
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
            <CardFooter className="flex justify-end px-6"></CardFooter>
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
        </section>
      </section>
    </>
  );
}
