import axios from "@/config/axios";

export async function getPrices() {
  const response = await axios.get(`/api/prices`);
  return response.data;
}
