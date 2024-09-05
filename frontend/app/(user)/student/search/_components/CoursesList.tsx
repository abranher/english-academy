import { Course } from "@/types/models/Course";
import { Level } from "@/types/models/Level";

type CourseWithProgressWithCategory = Course & {
  level: Level | null;
  chapters: { id: string }[];
  progress: number | null;
};

interface CoursesListProps {
  items: CourseWithProgressWithCategory[];
}

export default function CoursesList({ items }: CoursesListProps) {
  return (
    <div>
      {items.map((item) => (
        <div key={item.id}>{item.title}</div>
      ))}
    </div>
  );
}
