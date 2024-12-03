"use client";

import Preview from "@/components/shadcn/ui/preview";
import { Skeleton } from "@/components/shadcn/ui/skeleton";
import axios from "@/config/axios";
import { assetVideo } from "@/libs/asset";
import { useQuery } from "@tanstack/react-query";
import { Loader2, Video } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";

export default function CourseLessonClassPage() {
  const [playerReady, setPlayerReady] = useState(false);

  const { courseId, chapterId, lessonId } = useParams();

  const {
    isPending,
    error,
    data: lesson,
  } = useQuery({
    queryKey: ["course-purchased-page"],
    queryFn: async () => {
      const response = await axios.get(
        `/api/lessons/${lessonId}/chapter/${chapterId}`
      );
      return response.data;
    },
  });

  console.log(lesson);

  useEffect(() => {
    setPlayerReady(true);
  }, []);

  return (
    <>
      {!isPending ? (
        <>
          <div className="rounded-lg lg:col-span-2 flex flex-col gap-5">
            {lesson.video ? (
              <>
                {playerReady ? (
                  <div className="aspect-video rounded-lg">
                    <ReactPlayer
                      controls
                      width={"100%"}
                      height={"100%"}
                      url={assetVideo(lesson.video)}
                    />
                  </div>
                ) : (
                  <>
                    <Skeleton className="w-full h-full flex justify-center items-center">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    </Skeleton>
                  </>
                )}
              </>
            ) : (
              <div className="grid aspect-video place-items-center rounded-lg bg-zinc-200 dark:bg-zinc-800">
                <Video className="h-9 w-9 text-gray-600 aspect-video" />
              </div>
            )}

            <h2 className="text-2xl font-semibold">{lesson.title}</h2>
            <section>
              <Preview value={lesson.description} />
            </section>
          </div>
        </>
      ) : (
        <>Cargando...</>
      )}
    </>
  );
}
