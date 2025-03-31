import axios from "@/config/axios";

export async function getCoursesStats(tutorId: string) {
  const res = await axios.get(
    `/api/tutors/dashboard/analytics/courses-stats/tutor/${tutorId}`
  );
  return res.data;
}
