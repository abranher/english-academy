import axios from "@/config/axios";

export async function getAdminCourseReviews(courseId: string) {
  const response = await axios.get(
    `/api/admin/course-reviews/course/${courseId}`
  );
  return response.data;
}
