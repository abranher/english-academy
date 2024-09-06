import { getDashboardCourses } from "@/app/_actions/get-dashboard-courses";
import { Clock } from "lucide-react";
import InfoCard from "./_components/InfoCard";

export default async function StudentDashboardPage() {
  const { completedCourses, coursesInProgress } = getDashboardCourses("");

  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoCard
          icon={Clock}
          label="En progreso"
          numberOfItems={coursesInProgress.length}
        />

        <InfoCard
          icon={Clock}
          label="En progreso"
          numberOfItems={coursesInProgress.length}
          variant="success"
        />
      </div>
      <CoursesList items={[...coursesInProgress, ...completedCourses]} />
    </div>
  );
}
