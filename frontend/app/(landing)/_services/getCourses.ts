import axios from "@/config/axios";

export async function getCourses() {
  const res = await axios.get("/api/courses");

  return res.data;
}
