import axios from "@/config/axios";
import { Chapter } from "@/types/models/Chapter";
import { Course } from "@/types/models/Course";
import { StudentProgress } from "@/types/models/StudentProgress";
import CourseSidebarItem from "./CourseSidebarItem";
import CourseProgress from "@/components/courses/CourseProgress";

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
    <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
      <div className="p-8 flex flex-col border-b">
        <h1 className="font-semibold">{course.title}</h1>
        {purchase && <div>aqui deberia ir el CourseProgress</div>}

        <div className="mt-10">
          <CourseProgress variant="success" value={progressCount} />
        </div>
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
