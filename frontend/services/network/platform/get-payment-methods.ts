import axios from "@/config/axios";

export async function getPaymentMethods(userId: string) {
  const res = await axios.get(`/api/platform/user/${userId}/payment-method`);
  return res.data;
}
