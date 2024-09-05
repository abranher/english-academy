import axios from "@/config/axios";
import { redirect } from "next/navigation";

export default async function CourseIdPage({
  params,
}: {
  params: {
    courseId: string;
  };
}) {
  const { data: course } = await axios.get(
    `/api/courses/${params.courseId}/chapters`
  );

  if (!course) return redirect("/");

  return redirect(
    `/student/courses/${course.id}/chapters/${course.chapters[0].id}`
  );
}
