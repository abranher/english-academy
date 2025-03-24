import axios from "@/config/axios";

export async function getSubscriptionOrders() {
  const res = await axios.get(`/api/admin/subscription-orders`);
  return res.data;
}
