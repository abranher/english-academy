import axios from "@/config/axios";
import Levels from "./_components/Levels";
import SearchInput from "@/components/common/SearchInput";
import { getCourses } from "@/app/_actions/get-courses";
import CoursesList from "./_components/CoursesList";

interface SearchPageProps {
  searchParams: {
    title: string;
    levelId: string;
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { data: levels } = await axios.get(`/api/levels/`);

  const courses = await getCourses({
    studentId: "",
    ...searchParams,
  });

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
