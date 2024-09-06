import axios from "@/config/axios";
import { Chapter } from "@/types/models/Chapter";
import { Course } from "@/types/models/Course";
import { Level } from "@/types/models/Level";

type CourseWithProgressWithLevel = Course & {
  level: Level;
  chapters: Chapter[];
  progress: number | null;
};

type DashboardCorses = {
  completedCourses: CourseWithProgressWithLevel[];
  coursesInProgress: CourseWithProgressWithLevel[];
};

export const getDashboardCourses = async (
  studentId: string
): Promise<DashboardCorses> => {
  try {
    const response = await axios.get(`/api/purchases/${studentId}/courses`);
    return response.data;
  } catch (error) {
    console.log(error);
    return {
      completedCourses: [],
      coursesInProgress: [],
    };
  }
};
