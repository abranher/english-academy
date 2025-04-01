"use client";

import { useParams } from "next/navigation";

import ReactPlayer from "react-player";
import { useQuery } from "@tanstack/react-query";
import { truncateString } from "@/libs/format";
import { useEffect, useState } from "react";
import { getClassWithProgress } from "@/services/network/enrollments/class";
import { assetAttachments, assetVideo } from "@/libs/asset";
import { Attachment, Class, ClassProgress } from "@/types/models";

import { CourseNav } from "@/components/enrollments";
import { MarkAsRead } from "./MarkAsRead";

import Preview from "@/components/shadcn/ui/preview";
import { Skeleton } from "@/components/shadcn/ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import {
  CircleCheck,
  FileIcon,
  FolderOpen,
  ImageIcon,
  Loader2,
  Video,
} from "lucide-react";
import { Button } from "@/components/shadcn/ui/button";

export function ClassContent({ studentId }: { studentId: string }) {
  const [playerReady, setPlayerReady] = useState(false);

  const { classId } = useParams();

  const {
    isPending,
    data: lessonClass,
    isError,
  } = useQuery<
    Class & {
      classProgress: ClassProgress | null;
      attachments: Attachment[] | [];
    }
  >({
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

              {!lessonClass.classProgress ? (
                <MarkAsRead studentId={studentId} />
              ) : (
                <Button
                  className="flex gap-2 items-center"
                  type="button"
                  disabled
                >
                  <CircleCheck className="w-5 h-5" />
                  Completado
                </Button>
              )}
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

            <Card>
              <CardHeader>
                <CardTitle>Recursos</CardTitle>
              </CardHeader>
              <CardContent>
                <section className="mt-4 flex justify-center sm:justify-start flex-wrap gap-4">
                  {lessonClass.attachments.length === 0 ? (
                    <CardDescription className="text-lg w-full">
                      <p className="flex justify-center flex-col items-center">
                        <FolderOpen className="w-12 h-12" />
                        Esta clase no tiene recursos.
                      </p>
                    </CardDescription>
                  ) : (
                    lessonClass.attachments.map((attachment) => {
                      const getFileExtension = (url: string) =>
                        url.split(".").pop()?.toLowerCase();

                      const fileExtension = getFileExtension(attachment.url);

                      const isImage =
                        fileExtension === "png" ||
                        fileExtension === "jpg" ||
                        fileExtension === "jpeg";

                      return (
                        <Card
                          key={attachment.id}
                          className="p-2 w-60 flex justify-between items-center gap-1"
                        >
                          <a
                            href={assetAttachments(attachment.url)}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <section className="flex items-center gap-2 justify-between">
                              {isImage ? (
                                <ImageIcon className="text-gray-500" />
                              ) : (
                                <FileIcon className="text-gray-500" />
                              )}
                              <CardDescription>
                                {truncateString(attachment.title)}
                              </CardDescription>
                            </section>
                          </a>
                        </Card>
                      );
                    })
                  )}
                </section>
              </CardContent>
            </Card>
          </section>
        </section>

        <CourseNav studentId={studentId} />
      </section>
    </>
  );
}
