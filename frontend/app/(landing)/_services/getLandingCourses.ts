import axios from "@/config/axios";

export async function getLandingCourses() {
  const res = await axios.get("/api/courses/landing");

  return res.data;
}
