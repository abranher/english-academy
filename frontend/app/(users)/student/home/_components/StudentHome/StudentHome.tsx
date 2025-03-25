"use client";

import { useQuery } from "@tanstack/react-query";
import { Level, Student, User } from "@/types/models";
import { getUserStudent } from "../../_services";

import { StudentHomeSkeleton } from "./StudentHomeSkeleton";
import { ProfileCard } from "./ProfileCard";
import { Enrollments } from "./Enrollments";
import { MyTutors } from "./MyTutors";

import { Card, CardDescription, CardHeader } from "@/components/shadcn/ui/card";
import { Clipboard, ClipboardCheck, Medal } from "lucide-react";

export function StudentHome({
  userId,
  studentId,
}: {
  userId: string;
  studentId: string;
}) {
  const {
    isPending,
    data: userStudent,
    isError,
  } = useQuery<User & { student: Student & { level: Level } }>({
    queryKey: ["student_home"],
    queryFn: () => getUserStudent(userId as string),
  });

  if (isPending) return <StudentHomeSkeleton />;
  if (isError) return <div>No se pudo cargar la información.</div>;

  return (
    <section className="w-full grid grid-cols-1 lg:grid-cols-8 gap-4">
      <ProfileCard userStudent={userStudent} />

      <section className="lg:col-span-5 gap-3 flex flex-col">
        <article className="flex gap-3">
          <Card className="min-w-44">
            <CardHeader>
              <section className="flex flex-col items-center gap-2">
                <CardDescription className="font-bold text-lg text-center">
                  Cursos inscritos
                </CardDescription>
                <CardDescription className="flex items-center gap-3 font-bold text-4xl">
                  <Clipboard className="w-12 h-12" />
                  12
                </CardDescription>
              </section>
            </CardHeader>
          </Card>

          <Card className="min-w-44">
            <CardHeader>
              <section className="flex flex-col items-center gap-2 ">
                <CardDescription className="font-bold text-lg text-center">
                  Cursos completados
                </CardDescription>
                <CardDescription className="flex items-center gap-3 font-bold text-4xl">
                  <ClipboardCheck className="w-12 h-12" />
                  12
                </CardDescription>
              </section>
            </CardHeader>
          </Card>

          <Card className="min-w-44">
            <CardHeader>
              <section className="flex flex-col items-center gap-2">
                <CardDescription className="font-bold text-lg text-center">
                  Puntos
                </CardDescription>
                <CardDescription className="flex items-center gap-3 font-bold text-4xl">
                  <Medal className="w-12 h-12" />
                  500
                </CardDescription>
              </section>
            </CardHeader>
          </Card>
        </article>

        <Enrollments studentId={studentId} />

        <MyTutors studentId={studentId} />
      </section>
    </section>
  );
}
