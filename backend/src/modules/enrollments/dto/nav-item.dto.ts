export class NavItemDto {
  id: string;
  title: string;
  type: 'chapter' | 'class' | 'quiz';
  completed: boolean;
  courseId: string;
  chapterId?: string;
  lessonId?: string;
  position?: number; // Para ordenamiento manual
  subItems?: NavItemDto[];
}
