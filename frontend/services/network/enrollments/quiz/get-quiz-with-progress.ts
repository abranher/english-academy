import axios from "@/config/axios";

export async function getQuizWithProgress(studentId: string, quizId: string) {
  const res = await axios.get(
    `/api/quiz-progress/student/${studentId}/quiz/${quizId}`
  );
  return res.data;
}
