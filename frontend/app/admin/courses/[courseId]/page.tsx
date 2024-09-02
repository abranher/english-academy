import axios from "@/config/axios";
import { redirect } from "next/navigation";

export default async function CourseIdPage({
  params,
}: {
  params: {
    courseId: string;
  };
}) {
  const response = await axios.get(`/api/courses/${params.courseId + "23"}`);

  if (!response) {
    return redirect("/admin");
  }

  const requieredFields = [
    response.data.title,
    response.data.description,
    response.data.imageUrl,
    response.data.price,
    response.data.skillId,
  ];

  const totalFields = requieredFields.length;
  const completedFields = requieredFields.filter(Boolean).length;

  const completionText = `(${completedFields} / ${totalFields})`;

  return (
    <div>
      {params.courseId}
      CoursePage
    </div>
  );
}
