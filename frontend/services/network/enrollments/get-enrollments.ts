import axios from "@/config/axios";

export async function getEnrollments(studentId: string) {
  const response = await axios.get(`/api/enrollments/student/${studentId}`);
  return response.data;
}
