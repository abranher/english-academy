import axios from "@/config/axios";

export async function getCourseMetrics() {
  const res = await axios.get(`/api/dashboard/analytics/courses-metrics`);
  return res.data;
}
