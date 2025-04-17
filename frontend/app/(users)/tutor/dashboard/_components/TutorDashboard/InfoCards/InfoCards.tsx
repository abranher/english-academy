import { ActiveStudentsCard } from "./ActiveStudentsCard";
import { CoursesStatsCard } from "./CoursesStatsCard";
import { EarningsCard } from "./EarningsCard";

export function InfoCards({ tutorId }: { tutorId: string }) {
  return (
    <section className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
      <EarningsCard tutorId={tutorId} />
      <ActiveStudentsCard tutorId={tutorId} />
      <CoursesStatsCard tutorId={tutorId} />
    </section>
  );
}
