import axios from "@/config/axios";

export default async function CoursesLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { courseId: string };
}) {
  const { data: course } = await axios.get(
    `/api/courses/${params.courseId}/all`
  );

  console.log(course);

  return <div>{children}</div>;
}
