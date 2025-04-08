import axios from "@/config/axios";

export async function getTutorCoursesStudents(tutorId: string) {
  const res = await axios.get(
    `/api/tutors/dashboard/charts/courses-students/tutor/${tutorId}`
  );
  return res.data;
}
