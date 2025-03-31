import axios from "@/config/axios";

export async function getEnrollmentOrder(id: string, studentId: string) {
  const res = await axios.get(
    `/api/enrollment-orders/${id}/student/${studentId}`
  );
  return res.data;
}
