import axios from "@/config/axios";
import { Chapter } from "@/types/models/Chapter";
import { Course } from "@/types/models/Course";
import { StudentProgress } from "@/types/models/StudentProgress";
import CourseSidebarItem from "./CourseSidebarItem";

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
    `/api/purchases/2b0137e8-80c7-4b99-8bc9-df7d14710468/course/${course.id}`
  );

  return (
    <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
      <div className="p-8 flex flex-col border-b">
        <h1 className="font-semibold">{course.title}</h1>
        {/* Check purchase and add progress */}
      </div>
      <div className="flex flex-col w-full">
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
    </div>
  );
}
