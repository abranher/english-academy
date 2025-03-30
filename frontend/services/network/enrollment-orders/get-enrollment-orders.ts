import axios from "@/config/axios";

export async function getEnrollmentOrders(studentId: string) {
  const res = await axios.get(`/api/enrollment-orders/student/${studentId}`);
  return res.data;
}
