import Link from "next/link";
import { redirect } from "next/navigation";

import axios from "@/config/axios";
import { auth } from "@/config/auth";

import { ChapterContent } from "./_components/ChapterContent";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/shadcn/ui/breadcrumb";

export default async function ChapterIdPage({
  params,
}: {
  params: {
    courseId: string;
    chapterId: string;
  };
}) {
  const session = await auth();

  if (!session) redirect("/tutor/dashboard");

  const { data: chapter } = await axios.get(
    `/api/chapters/${params.chapterId}/course/${params.courseId}`
  );

  if (!chapter) {
    return redirect("/tutor/courses");
  }

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/tutor/dashboard">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/tutor/courses">Cursos</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={`/tutor/courses/${params.courseId}`}>Curso</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Capítulo</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <ChapterContent chapter={chapter} />
    </>
  );
}
