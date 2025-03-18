import axios from "@/config/axios";

export async function getLandingCourses() {
  const res = await axios.get("/api/landing-page/courses");
  return res.data;
}
