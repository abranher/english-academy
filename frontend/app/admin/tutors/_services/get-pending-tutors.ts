import axios from "@/config/axios";

export async function getPendingTutors() {
  const response = await axios.get(`/api/admin/tutors/pending`);
  return response.data;
}
