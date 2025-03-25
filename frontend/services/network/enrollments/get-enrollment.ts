import axios from "@/config/axios";

export async function getEnrollment(studentId: string, courseId: string) {
  const response = await axios.get(
    `/api/enrollments/student/${studentId}/course/${courseId}`
  );
  return response.data;
}
