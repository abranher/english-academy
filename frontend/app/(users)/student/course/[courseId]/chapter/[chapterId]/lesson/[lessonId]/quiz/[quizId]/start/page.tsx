import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "@/config/auth";

import { StartContent } from "./_components/StartContent";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/shadcn/ui/breadcrumb";

export default async function QuizStartPage({
  params,
}: {
  params: {
    courseId: string;
    chapterId: string;
    lessonId: string;
    quizId: string;
  };
}) {
  const session = await auth();
  if (!session) redirect("/");
  if (!session.user.student) redirect("/");

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/student/home">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={`/student/course/${params.courseId}`}>Curso</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link
                href={`/student/course/${params.courseId}/chapter/${params.chapterId}`}
              >
                Capítulo
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link
                href={`/student/course/${params.courseId}/chapter/${params.chapterId}/lesson/${params.lessonId}/quiz/${params.quizId}`}
              >
                Quiz
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbPage>Comenzar</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <StartContent studentId={session.user.student.id} />
    </>
  );
}
