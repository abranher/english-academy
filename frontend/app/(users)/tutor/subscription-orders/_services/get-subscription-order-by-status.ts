import axios from "@/config/axios";
import { SubscriptionOrderStatus } from "@/types/enums";

export async function getSubscriptionOrderByStatus(
  status: SubscriptionOrderStatus
) {
  const res = await axios.get(
    `/api/admin/subscription-orders/status/${status}`
  );
  return res.data;
}
