import axios from "@/config/axios";

export async function getUserTutorWithPaymentMethod(userId: string) {
  const response = await axios.get(`/api/tutors/user/${userId}/payment-method`);
  return response.data;
}
