import { getChapter } from "@/app/_actions/get-chapter";
import { Banner } from "@/components/shadcn/ui/banner";
import { redirect } from "next/navigation";
import VideoPlayer from "./_components/VideoPlayer";
import CourseEnrollButton from "./_components/CourseEnrollButton";
import { Separator } from "@/components/shadcn/ui/separator";
import Preview from "@/components/shadcn/ui/preview";
import { File } from "lucide-react";
import CourseProgressButton from "./_components/CourseProgressButton";
import axios from "@/config/axios";
import CourseSidebar from "../../_components/CourseSidebar";

export default async function ChapterIdPage({
  params,
}: {
  params: {
    courseId: string;
    chapterId: string;
  };
}) {
  const { data } = await axios.get(
    `/api/chapters/${params.chapterId}/student/${studentId}/course/${params.courseId}/`
  );

  if (!data.chapter || !data.course) return redirect("/");

  const isLocked = !data.chapter.isFree && !data.purchase;
  const completeOnEnd = !!data.purchase && !data.studentProgress?.isCompleted;

  return (
    <>
      <div className="bg-yellow-400 w-full flex items-center justify-center">
        <div className="max-w-[1536px] md:px-24 lg:px-32">
          <div className="py-12 w-full">
            <div className="w-full">
              <h2 className="font-bold text-2xl">
                Welcome back, {session?.user.name}
              </h2>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex items-center justify-center">
        <div className="max-w-[1200px]">
          <div>
            <div className="bg-background">
              <div className="grid lg:grid-cols-5">
                <CourseSidebar className="hidden lg:block" />
                <div className="col-span-3 lg:col-span-4 p-6">
                  <div>
                    {data.studentProgress?.isCompleted && (
                      <Banner
                        variant="success"
                        label="Ya has completado este capítulo."
                      />
                    )}
                    {isLocked && (
                      <Banner
                        variant="warning"
                        label="Necesitas comprar este curso para poder ver este capítulo."
                      />
                    )}
                    <div className="flex flex-col max-w-4xl mx-auto pb-20">
                      <div className="p-4">
                        <VideoPlayer
                          chapterId={params.chapterId}
                          title={data.chapter.title}
                          courseId={params.courseId}
                          nextChapterId={data.nextChapter?.id}
                          playbackId={data.muxData?.playbackId!}
                          isLocked={isLocked}
                          completeOnEnd={completeOnEnd}
                        />
                      </div>
                      <div>
                        <div className="p-4 flex flex-col md:flex-row items-center justify-between">
                          <h2 className="text-2xl font-semibold mb-2">
                            {data.chapter.title}
                          </h2>
                          {data.purchase ? (
                            <CourseProgressButton
                              chapterId={params.chapterId}
                              courseId={params.courseId}
                              nextChapterId={data.nextChapter?.id}
                              isCompleted={!!data.studentProgress?.isCompleted}
                            />
                          ) : (
                            <CourseEnrollButton
                              courseId={params.courseId}
                              price={data.course.price}
                            />
                          )}
                        </div>
                        <Separator />
                        <div>
                          <Preview value={data.chapter.description!} />
                        </div>
                        {!!data.attachments.length && (
                          <>
                            <Separator />
                            <div className="p-4">
                              {data.attachments.map((attachment: any) => (
                                <a
                                  key={attachment.id}
                                  href={attachment.url}
                                  target="_blank"
                                  className="flex items-center p-3 w-full bg-sky-200 border text-sky-700 rounded-md hover:underline"
                                >
                                  <File />
                                  <p className="line-clamp-1">
                                    {attachment.name}
                                  </p>
                                </a>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
