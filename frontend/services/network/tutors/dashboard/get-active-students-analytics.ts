import axios from "@/config/axios";

export async function getActiveStudentsAnalytics(tutorId: string) {
  const res = await axios.get(
    `/api/tutors/dashboard/analytics/active-students/tutor/${tutorId}`
  );
  return res.data;
}
