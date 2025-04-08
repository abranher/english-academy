import axios from "@/config/axios";

export async function getTutorMonthlyRevenue(tutorId: string) {
  const res = await axios.get(
    `/api/tutors/dashboard/charts/monthly-revenue/tutor/${tutorId}`
  );
  return res.data;
}
