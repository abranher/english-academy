import axios from "@/config/axios";

export async function getAllCourses() {
  const response = await axios.get(`/api/admin/courses/list`);
  return response.data;
}
