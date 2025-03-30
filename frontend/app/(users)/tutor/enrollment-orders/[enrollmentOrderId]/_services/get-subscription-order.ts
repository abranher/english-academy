import axios from "@/config/axios";

export async function getSubscriptionOrder(id: string) {
  const res = await axios.get(`/api/admin/subscription-orders/${id}`);
  return res.data;
}
