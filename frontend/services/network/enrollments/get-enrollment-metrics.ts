import axios from "@/config/axios";

export async function getEnrollmentMetrics(
  studentId: string,
  courseId: string
) {
  const response = await axios.get(
    `/api/enrollments/metrics/student/${studentId}/course/${courseId}`
  );
  return response.data;
}
