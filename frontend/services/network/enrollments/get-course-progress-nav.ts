import axios from "@/config/axios";

export async function getCourseProgressNav(
  studentId: string,
  courseId: string
) {
  const response = await axios.get(
    `/api/enrollments/student/${studentId}/course/${courseId}/progress-navigation`
  );
  return response.data;
}
