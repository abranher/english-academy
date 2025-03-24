import axios from "@/config/axios";
import { SubscriptionOrderStatus } from "@/types/enums";

export async function getSubscriptionOrderByStatus(
  status: SubscriptionOrderStatus,
  tutorId: string
) {
  const res = await axios.get(
    `/api/subscription-orders/status/${status}/tutor/${tutorId}`
  );
  return res.data;
}
