import { Lesson } from "./Lesson";

export interface Chapter {
  id: string;
  title: string;
  description: string | null;
  position: number;

  lessons: Lesson[] | [];

  courseId: string;

  createdAt: Date;
  updatedAt: Date;
}
