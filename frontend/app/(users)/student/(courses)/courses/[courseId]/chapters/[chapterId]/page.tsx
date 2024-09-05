import { getChapter } from "@/app/_actions/get-chapter";
import { Banner } from "@/components/shadcn/ui/banner";
import { redirect } from "next/navigation";
import VideoPlayer from "./_components/VideoPlayer";
import CourseEnrollButton from "./_components/CourseEnrollButton";
import { Separator } from "@/components/shadcn/ui/separator";
import Preview from "@/components/shadcn/ui/preview";
import { File } from "lucide-react";

export default async function ChapterIdPage({
  params,
}: {
  params: {
    courseId: string;
    chapterId: string;
  };
}) {
  const {
    chapter,
    course,
    muxData,
    attachments,
    nextChapter,
    studentProgress,
    purchase,
  } = await getChapter({
    studentId: "a4b10c50-5cb5-46da-b20d-340d13523d0b",
    chapterId: params.chapterId,
    courseId: params.courseId,
  });

  if (!chapter || !course) return redirect("/");

  const isLocked = !chapter.isFree && !purchase;
  const completeOnEnd = !!purchase && !studentProgress?.isCompleted;

  return (
    <div>
      {studentProgress?.isCompleted && (
        <Banner variant="success" label="Ya has completado este capítulo." />
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
            title={chapter.title}
            courseId={params.courseId}
            nextChapterId={nextChapter?.id}
            playbackId={muxData?.playbackId!}
            isLocked={isLocked}
            completeOnEnd={completeOnEnd}
          />
        </div>
        <div>
          <div className="p-4 flex flex-col md:flex-row items-center justify-between">
            <h2 className="text-2xl font-semibold mb-2">{chapter.title}</h2>
            {purchase ? (
              <div></div>
            ) : (
              <CourseEnrollButton
                courseId={params.courseId}
                price={course.price}
              />
            )}
          </div>
          <Separator />
          <div>
            <Preview value={chapter.description!} />
          </div>
          {!!attachments.length && (
            <>
              <Separator />
              <div className="p-4">
                {attachments.map((attachment: any) => (
                  <a
                    key={attachment.id}
                    href={attachment.url}
                    target="_blank"
                    className="flex items-center p-3 w-full bg-sky-200 border text-sky-700 rounded-md hover:underline"
                  >
                    <File />
                    <p className="line-clamp-1">{attachment.name}</p>
                  </a>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
