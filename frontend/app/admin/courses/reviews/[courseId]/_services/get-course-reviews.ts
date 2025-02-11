import axios from "@/config/axios";

export async function getCourseReviews(courseId: string) {
  const response = await axios.get(`/api/course-reviews/course/${courseId}/admin`);
  return response.data;
}
