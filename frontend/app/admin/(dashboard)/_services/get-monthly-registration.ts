import axios from "@/config/axios";

export async function getMonthlyRegistrations() {
  const response = await axios.get(
    `/api/dashboard/overview/monthly-registrations`
  );
  return response.data;
}
