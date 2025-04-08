import axios from "@/config/axios";

export async function getInfoCards() {
  const res = await axios.get(`/api/dashboard/overview/info-cards`);
  return res.data;
}
