import axios from "@/config/axios";

export async function getTutorEnrollmentOrder(id: string, tutorId: string) {
  const res = await axios.get(`/api/enrollment-orders/${id}/tutor/${tutorId}`);
  return res.data;
}
