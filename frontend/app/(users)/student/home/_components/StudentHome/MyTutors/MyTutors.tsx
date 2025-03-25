"use client";

import Link from "next/link";

import Avvvatars from "avvvatars-react";
import { assetImg } from "@/libs/asset";
import { getTutors } from "@/services/network/enrollments";
import { Tutor, User } from "@/types/models";
import { Avatar } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import { ArrowRight, FolderOpen } from "lucide-react";
import { Button } from "@/components/shadcn/ui/button";
import { Separator } from "@/components/shadcn/ui/separator";

export function MyTutors({ studentId }: { studentId: string }) {
  const {
    isPending,
    data: tutors,
    isError,
  } = useQuery<
    | (Tutor & {
        user: User;
      })[]
    | []
  >({
    queryKey: ["student_home", "get_tutors"],
    queryFn: () => getTutors(studentId as string),
  });

  if (isPending) return <>Cragando...</>;
  if (isError) return <div>No se pudo cargar la información.</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mis tutores</CardTitle>
      </CardHeader>
      <CardContent>
        {tutors.length === 0 && (
          <CardDescription className="text-lg w-full italic">
            <p className="flex justify-center flex-col items-center">
              <FolderOpen className="w-20 h-20" />
              Sin tutores
            </p>
          </CardDescription>
        )}
        {tutors.map((tutor) => (
          <section key={tutor.id}>
            <article className="col-span-7 flex items-start gap-4">
              <section>
                {tutor.user.avatarUrl ? (
                  <Avatar
                    isBordered
                    className="w-16 h-16 cursor-pointer"
                    color="default"
                    src={assetImg(tutor.user.avatarUrl)}
                  />
                ) : (
                  <Avatar
                    isBordered
                    className="w-16 h-16 cursor-pointer"
                    color="default"
                    icon={<Avvvatars size={70} value={tutor.user.email} />}
                  />
                )}
              </section>

              <div className="flex flex-col gap-3 w-full">
                <h3 className="text-base font-bold text-gray-800 dark:text-zinc-50">
                  {`${tutor.user.name} - ${tutor.user.lastName}`}
                </h3>
              </div>

              <section className="px-3">
                <Link href={`/courses/${tutor.id}`}>
                  <Button size="icon" variant="ghost">
                    <ArrowRight />
                  </Button>
                </Link>
              </section>
            </article>

            <Separator className="my-3" />
          </section>
        ))}
      </CardContent>
    </Card>
  );
}
