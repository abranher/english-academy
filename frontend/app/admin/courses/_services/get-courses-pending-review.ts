import axios from "@/config/axios";

export async function getCoursesPendingReview() {
  const response = await axios.get(`/api/courses/pending-review`);
  return response.data;
}
