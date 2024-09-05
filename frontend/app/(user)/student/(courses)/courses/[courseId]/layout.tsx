import { getProgress } from "@/app/_actions/get-progress";
import axios from "@/config/axios";
import CourseSidebar from "./_components/CourseSidebar";
import CourseNavbar from "./_components/CourseNavbar";

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
      "2dd1501a-b4a3-41c1-91da-e7520d792945",
      params.courseId
    );

    return (
      <div className="h-full">
        <div className="h-[180px] md:pl-80 fixed inset-y-0 left-full z-50">
          <CourseNavbar course={course} progressCount={progressCount} />
        </div>
        <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50">
          <CourseSidebar course={course} progressCount={progressCount} />
        </div>

        <main className="md:pl-80 pt-[80px] h-full">{children}</main>
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
