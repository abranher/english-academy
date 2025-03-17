import { CoursePlatformStatus, CourseReviewStatus } from "../enums";
import { Category } from "./Category";
import { Chapter } from "./Chapter";
import { Level } from "./Level";
import { Price } from "./Price";
import { SubCategory } from "./SubCategory";
import { Tutor } from "./Tutor";

export interface Course {
  id: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  requirements: string | null;
  learningObjectives: string | null;
  image: string | null;
  trailer: string | null;
  reviewStatus: CourseReviewStatus;
  platformStatus: CoursePlatformStatus;
  publishedAt: Date | null;

  tutor: Tutor | null;
  price: Price | null;
  level: Level | null;
  category: Category | null;
  subcategory: SubCategory | null;
  chapters: Chapter[] | [];

  tutorId: string;
  priceId: string | null;
  levelId: string | null;
  categoryId: string | null;
  subcategoryId: string | null;

  createdAt: Date;
  updatedAt: Date;
}
