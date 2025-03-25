import axios from "@/config/axios";

export async function getTutorPaymentMethods(tutorId: string) {
  const res = await axios.get(`/api/tutors/tutor/${tutorId}/payment-method`);
  return res.data;
}
