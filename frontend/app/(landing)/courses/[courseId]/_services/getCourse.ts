import axios from "@/config/axios";

export async function getCourse(courseId: string) {
  const response = await axios.get(`/api/courses/${courseId}`);
  return response.data;
}
