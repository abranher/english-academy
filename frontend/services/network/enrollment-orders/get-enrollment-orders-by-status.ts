import axios from "@/config/axios";

import { EnrollmentOrderStatus } from "@/types/enums";

export async function getEnrollmentOrdersByStatus(
  status: EnrollmentOrderStatus,
  studentId: string
) {
  const res = await axios.get(
    `/api/enrollment-orders/status/${status}/student/${studentId}`
  );
  return res.data;
}
