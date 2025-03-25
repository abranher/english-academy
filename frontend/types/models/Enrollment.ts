export interface Enrollment {
  id: string;
  isActive: boolean;
  purchasedPrice: number;

  studentId: string;
  courseId: string;
  enrollmentOrderId: string;

  enrolledAt: Date;
  updatedAt: Date;
}
