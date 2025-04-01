"use client";

import { useParams } from "next/navigation";

import ReactPlayer from "react-player";
import { useQuery } from "@tanstack/react-query";
import { assetVideo } from "@/libs/asset";
import { useEffect, useState } from "react";
import { Class, ClassProgress } from "@/types/models";
import { getClassWithProgress } from "@/services/network/enrollments/class";

import { CourseNav } from "@/components/enrollments";

import Preview from "@/components/shadcn/ui/preview";
import { Button } from "@/components/shadcn/ui/button";
import { Skeleton } from "@/components/shadcn/ui/skeleton";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import { CircleCheck, Loader2, Video } from "lucide-react";

export function ClassContent({ studentId }: { studentId: string }) {
  const [playerReady, setPlayerReady] = useState(false);

  const { classId } = useParams();

  const {
    isPending,
    data: lessonClass,
    isError,
  } = useQuery<Class & { classProgress: ClassProgress }>({
    queryKey: ["enrollment_course_class_datails", classId],
    queryFn: () => getClassWithProgress(studentId, classId as string),
  });

  useEffect(() => {
    setPlayerReady(true);
  }, []);

  if (isPending) return <>Cargando...</>;
  if (isError) return <div>No se pudo cargar la información del curso.</div>;

  return (
    <>
      <section className="w-full grid grid-cols-1 lg:grid-cols-8 gap-4">
        <section className="lg:col-span-5 gap-3 flex flex-col">
          <section className="aspect-video">
            {lessonClass.video ? (
              <>
                {playerReady ? (
                  <article className="aspect-video rounded-lg">
                    <ReactPlayer
                      controls
                      width={"100%"}
                      height={"100%"}
                      url={assetVideo(lessonClass.video)}
                    />
                  </article>
                ) : (
                  <Skeleton className="w-full h-full flex justify-center items-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  </Skeleton>
                )}
              </>
            ) : (
              <section className="grid aspect-video place-items-center rounded-lg bg-zinc-200 dark:bg-zinc-800">
                <Video className="h-9 w-9 text-gray-600 aspect-video" />
              </section>
            )}
          </section>

          <section className="flex flex-col py-2 gap-4">
            <article className="flex justify-between items-center">
              <CardTitle>{lessonClass.title}</CardTitle>
              <Button className="flex gap-2 items-center">
                <CircleCheck className="w-5 h-5" />
                Marcar como completado
              </Button>
            </article>
            {lessonClass.description && (
              <Card>
                <CardHeader>
                  <CardTitle>Descripción</CardTitle>
                </CardHeader>
                <CardContent>
                  <Preview value={lessonClass.description} />
                </CardContent>
              </Card>
            )}
          </section>
        </section>

        <CourseNav studentId={studentId} />
      </section>
    </>
  );
}
