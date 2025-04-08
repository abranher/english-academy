import axios from "@/config/axios";

export async function getMonthlyRegistrations() {
  const res = await axios.get(`/api/dashboard/overview/monthly-registrations`);
  return res.data;
}
