import axios from "@/config/axios";
import { TutorStatus } from "@/types/enums";

export async function getByStatusTutors(status: TutorStatus) {
  const response = await axios.get(`/api/admin/tutors/status/${status}`);
  return response.data;
}
