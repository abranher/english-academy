import axios from "@/config/axios";
import Levels from "./_components/Levels";
import SearchInput from "@/components/common/SearchInput";
import CoursesList from "./_components/CoursesList";
import { Level } from "@/types/models/Level";
import { Course } from "@/types/models/Course";
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/next-auth";

interface SearchPageProps {
  searchParams: {
    title: string;
    levelId: string;
  };
}

type CourseWithProgressWithCategory = Course & {
  level: Level | null;
  chapters: { id: string }[];
  progress: number | null;
};

type GetCourses = {
  studentId: string;
  title?: string;
  levelId?: string;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const session = await getServerSession(authOptions);
  const studentId = session?.user.student.id;
  const { data: levels } = await axios.get(`/api/levels/`);
  const { data: courses } = await axios.get(
    `/api/courses/${studentId}/levels/${searchParams.levelId}?title=${searchParams.title}`
  );

  console.log({
    levels,
    courses,
  });

  return;
  return (
    <>
      <div className="px-6 pt-6">
        <SearchInput />
      </div>
      <div className="p-6 space-y-4">
        <Levels items={levels} />
        <CoursesList items={courses} />
      </div>
    </>
  );
}
