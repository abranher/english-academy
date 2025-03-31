"use client";

import { Course } from "@/types/models";
import { CoursePlatformStatus, CourseReviewStatus } from "@/types/enums";

import { AlertBanner } from "@/components/common/AlertBanner";

export function CourseStatusBanner({ course }: { course: Course }) {
  if (course.reviewStatus === CourseReviewStatus.REJECTED)
    return <AlertBanner variant="destructive" label="Curso rechazado" />;

  if (course.reviewStatus === CourseReviewStatus.NEEDS_REVISION)
    return (
      <AlertBanner
        variant="warning"
        label="Revisiones requeridas"
        description="Revisa los comentarios del administrador y realiza los cambios solicitados."
      />
    );

  if (course.reviewStatus === CourseReviewStatus.PENDING_REVIEW)
    return (
      <AlertBanner
        variant="info"
        label="En revisión"
        description="El curso está siendo evaluado por el administrador. Serás notificado cuando haya un veredicto."
      />
    );

  if (
    course.reviewStatus === CourseReviewStatus.APPROVED &&
    course.platformStatus !== CoursePlatformStatus.PUBLISHED
  )
    return (
      <AlertBanner
        variant="info"
        label="Curso aprobado"
        description="El curso ha sido aprobado pero no está publicado. Publícalo para que sea visible."
      />
    );

  if (course.platformStatus === CoursePlatformStatus.PUBLISHED)
    return (
      <AlertBanner
        variant="success"
        label="Curso publicado"
        description="El curso está visible y disponible para los estudiantes."
      />
    );

  if (course.platformStatus === CoursePlatformStatus.ARCHIVED)
    return (
      <AlertBanner
        variant="warning"
        label="Curso archivado"
        description="Este curso no es visible para nuevos estudiantes."
      />
    );

  return (
    <AlertBanner
      variant="info"
      label="Borrador en progreso"
      description="Completa todos los campos requeridos y envíalo para revisión."
    />
  );
}
