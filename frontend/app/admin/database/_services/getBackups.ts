import axios from "@/config/axios";

export async function getBackups() {
  const response = await axios.get(`/api/backup/list`);
  return response.data;
}
