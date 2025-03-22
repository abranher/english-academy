import axios from "@/config/axios";

export async function getPlatformWithPaymentMethod(userId: string) {
  const response = await axios.get(
    `/api/platform/admin/user/${userId}/payment-method`
  );
  return response.data;
}
