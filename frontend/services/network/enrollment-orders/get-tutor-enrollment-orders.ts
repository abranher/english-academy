import axios from "@/config/axios";

export async function getTutorEnrollmentOrders(tutorId: string) {
  const res = await axios.get(`/api/enrollment-orders/tutor/${tutorId}`);
  return res.data;
}
