import axios from "@/config/axios";

export async function getPlan(id: string) {
  const res = await axios.get(`/api/plans/${id}`);
  return res.data;
}
