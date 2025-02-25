import axios from "@/config/axios";

export async function getInfoCards() {
  const response = await axios.get(`/api/dashboard/overview/info-cards`);
  return response.data;
}
