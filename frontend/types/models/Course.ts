import { CourseStatus } from "../enums";
import { Category } from "./Category";
import { Price } from "./Price";
import { SubCategory } from "./SubCategory";

export interface Course {
  id: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  image: string | null;
  trailer: string | null;
  status: CourseStatus;
  isPublished: boolean;

  price: Price | null;
  category: Category | null;
  subcategory: SubCategory | null;

  priceId: string | null;
  levelId: string | null;
  categoryId: string | null;
  subcategoryId: string | null;
  skillId: string | null;
  createdAt: Date;
  updatedAt: Date;
}
