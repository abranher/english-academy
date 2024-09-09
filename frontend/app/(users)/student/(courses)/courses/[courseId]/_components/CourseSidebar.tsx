import axios from "@/config/axios";
import { Chapter } from "@/types/models/Chapter";
import { Course } from "@/types/models/Course";
import { StudentProgress } from "@/types/models/StudentProgress";
import CourseSidebarItem from "./CourseSidebarItem";
import CourseProgress from "@/components/courses/CourseProgress";
import { ScrollArea } from "@/components/shadcn/ui/scroll-area";
import { cn } from "@/libs/shadcn/utils";

interface CourseSidebarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: StudentProgress[] | null;
    })[];
  };
  progressCount: number;
}

export default async function CourseSidebar({
  course,
  progressCount,
}: CourseSidebarProps) {
  const { data: purchase } = await axios.get(
    `/api/purchases/2dd1501a-b4a3-41c1-91da-e7520d792945/course/${course.id}`
  );

  return (
    <>
      <div className={cn("pb-12")}>
        <div className="space-y-4 py-4">
          <div className="py-2">
            <h2 className="relative px-7 text-lg font-semibold tracking-tight">
              {course.title}
            </h2>
            {purchase && <div>aqui deberia ir el CourseProgress</div>}

            <div className="mt-10">
              <CourseProgress variant="success" value={progressCount} />
            </div>
            <ScrollArea className="h-[300px] px-1">
              <div className="space-y-1 p-2">
                {course.chapters.map((chapter) => (
                  <CourseSidebarItem
                    key={chapter.id}
                    id={chapter.id}
                    label={chapter.title}
                    isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
                    courseId={course.id}
                    isLocked={!chapter.isFree && !purchase}
                  />
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </>
  );
}
