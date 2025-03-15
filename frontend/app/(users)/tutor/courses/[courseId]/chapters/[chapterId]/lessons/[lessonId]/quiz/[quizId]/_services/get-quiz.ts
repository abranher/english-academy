import axios from "@/config/axios";

export async function getQuiz(id: string, lessonId: string) {
  const response = await axios.get(`/api/quizzes/${id}/lesson/${lessonId}`);
  return response.data;
}
