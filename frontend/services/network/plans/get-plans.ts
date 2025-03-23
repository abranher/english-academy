import axios from "@/config/axios";

export async function getPlans() {
  const res = await axios.get("/api/plans");
  return res.data;
}
