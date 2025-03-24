import axios from "@/config/axios";

export async function getSubscriptionOrders(tutorId: string) {
  const res = await axios.get(`/api/subscription-orders/tutor/${tutorId}`);
  return res.data;
}
