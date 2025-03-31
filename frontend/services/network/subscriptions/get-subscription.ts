import axios from "@/config/axios";

export async function getSubscription(tutorId: string) {
  const res = await axios.get(`/api/subscriptions/tutor/${tutorId}`);
  return res.data;
}
