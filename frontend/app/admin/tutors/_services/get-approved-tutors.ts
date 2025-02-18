import axios from "@/config/axios";

export async function getApprovedTutors() {
  const response = await axios.get(`/api/admin/tutors/approved`);
  return response.data;
}
