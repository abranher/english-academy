import axios from "@/config/axios";

export async function getTutors(studentId: string) {
  const res = await axios.get(`/api/enrollments/student/${studentId}/tutors`);
  return res.data;
}
