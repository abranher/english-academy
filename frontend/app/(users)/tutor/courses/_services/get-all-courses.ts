import axios from "@/config/axios";

export async function getAllCourses(userId: string) {
  const response = await axios.get(`/api/tutors/courses/list/user/${userId}`);
  return response.data;
}
