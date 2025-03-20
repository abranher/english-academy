import axios from "@/config/axios";

export async function getBanks() {
  const response = await axios.get(`/api/banks`);
  return response.data;
}
