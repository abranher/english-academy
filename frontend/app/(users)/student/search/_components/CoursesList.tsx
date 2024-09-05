import { Course } from "@/types/models/Course";
import { Level } from "@/types/models/Level";
import CourseCard from "./CourseCard";

type CourseWithProgressWithCategory = Course & {
  level: Level | null;
  chapters: { id: string }[];
  progress: number | null;
};

interface CoursesListProps {
  items: CourseWithProgressWithCategory[];
}

export default function CoursesList({ items }: CoursesListProps) {
  console.log(items);
  return (
    <div>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        {items.map((item) => (
          <CourseCard // 'CourseCard' is not defined
            key={item.id}
            id={item.id}
            title={item.title}
            imageUrl={item.imageUrl!}
            chaptersLength={item.chapters.length}
            price={item.price!}
            progress={item.progress}
            level={item?.level?.title!}
          />
        ))}
      </div>
      {items.length === 0 && (
        <div className="text-center text-sm text-muted-foreground mt-10">
          No se encontró ningún curso
        </div>
      )}
    </div>
  );
}
