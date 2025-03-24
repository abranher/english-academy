import axios from "@/config/axios";

export async function getSubscriptionOrder(id: string, tutorId: string) {
  const res = await axios.get(
    `/api/subscription-orders/${id}/tutor/${tutorId}`
  );
  return res.data;
}
