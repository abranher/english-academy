import axios from "@/config/axios";

export async function getClass(id: string, lessonId: string) {
  const response = await axios.get(`/api/classes/${id}/lesson/${lessonId}`);
  return response.data;
}
