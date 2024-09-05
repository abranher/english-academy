import { getProgress } from "@/app/_actions/get-progress";
import axios from "@/config/axios";

export default async function CoursesLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { courseId: string };
}) {
  try {
    const { data: course } = await axios.get(
      `/api/courses/${params.courseId}/all`
    );

    const progressCount = await getProgress(
      "2b0137e8-80c7-4b99-8bc9-df7d14710468",
      params.courseId
    );

    return (
      <div className="h-full">
        <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50">
          <CourseSidebar course={course} progressCount={progressCount} />
        </div>

        {children}
      </div>
    );
  } catch (error) {
    console.log(error);
    return (
      <div>
        Errror
        {children}
      </div>
    );
  }
}
