import { getChapter } from "@/app/_actions/get-chapter";
import { Banner } from "@/components/shadcn/ui/banner";
import { redirect } from "next/navigation";
import VideoPlayer from "./_components/VideoPlayer";

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
      </div>
    </div>
  );
}
