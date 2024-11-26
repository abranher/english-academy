import axios from "@/config/axios";

export async function getCourse(id: string) {
  const res = await axios.get(`/api/courses/${id}`);

  return res.data;
}
