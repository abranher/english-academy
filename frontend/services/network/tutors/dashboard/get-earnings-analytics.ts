import axios from "@/config/axios";

export async function getEarningsAnalytics(tutorId: string) {
  const res = await axios.get(
    `/api/tutors/dashboard/analytics/earnings/tutor/${tutorId}`
  );
  return res.data;
}
