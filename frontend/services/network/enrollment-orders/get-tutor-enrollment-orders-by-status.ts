import axios from "@/config/axios";

import { EnrollmentOrderStatus } from "@/types/enums";

export async function getTutorEnrollmentOrdersByStatus(
  status: EnrollmentOrderStatus,
  tutorId: string
) {
  const res = await axios.get(
    `/api/enrollment-orders/status/${status}/tutor/${tutorId}`
  );
  return res.data;
}
