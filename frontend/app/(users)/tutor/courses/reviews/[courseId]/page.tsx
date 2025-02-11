import { Separator } from "@/components/shadcn/ui/separator";
import { CourseReviewsList } from "./_components/CourseReviewsList/CourseReviewsList";

export default function CourseReviewPage() {
  return (
    <>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Tus cursos</h3>
          <p className="text-sm text-muted-foreground">
            Listado de todos tus cursos.
          </p>
        </div>

        <Separator />

        <CourseReviewsList />
      </div>
    </>
  );
}
