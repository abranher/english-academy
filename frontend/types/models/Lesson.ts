import { LessonType } from "../enums";
import { Class } from "./Class";
import { Quiz } from "./Quiz";

export interface Lesson {
  id: string;
  type: LessonType;
  position: number;

  chapterId: string;

  class: Class | null;
  quiz: Quiz | null;

  createdAt: Date;
  updatedAt: Date;
}
