import { TutorStatus } from '@prisma/client';

export function TutorStatusTraduction(status: TutorStatus): string {
  const translations: Record<TutorStatus, string> = {
    [TutorStatus.NEW]: 'NUEVO',
    [TutorStatus.PENDING]: 'PENDIENTE',
    [TutorStatus.RESUBMITTED]: 'REENVIADO',
    [TutorStatus.APPROVED]: 'APROBADO',
    [TutorStatus.REJECTED]: 'RECHAZADO',
  };

  return translations[status];
}
