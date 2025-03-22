import axios from "@/config/axios";

export async function getLandingPlans() {
  const res = await axios.get("/api/landing-page/plans");
  return res.data;
}
