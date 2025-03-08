import { CourseReviewDecision } from '@prisma/client';

export function CourseReviewDecisionTraduction(
  decision: CourseReviewDecision,
): string {
  const translations: Record<CourseReviewDecision, string> = {
    [CourseReviewDecision.APPROVED]: 'APROBADO',
    [CourseReviewDecision.NEEDS_CHANGES]: 'NECESITA CAMBIOS',
    [CourseReviewDecision.REJECTED]: 'RECHAZADO',
  };

  return translations[decision];
}
