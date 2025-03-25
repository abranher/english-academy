import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "@/config/auth";

import { CheckoutContent } from "./_components/CheckoutContent";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/shadcn/ui/breadcrumb";

export default async function EnrollmentCheckoutPage({
  params,
}: {
  params: {
    courseId: string;
    tutorId: string;
  };
}) {
  const session = await auth();

  if (!session) redirect("/");
  if (!session.user.student) redirect("/");

  return (
    <section className="flex justify-center">
      <section className="w-full flex flex-col gap-4 lg:gap-6 max-w-5xl px-8 py-5">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Inicio</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link
                  href={`/courses/${params.courseId}/tutor/${params.tutorId}`}
                >
                  Curso
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbPage>
                Confirmación de la Orden de inscripción
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <CheckoutContent
          userId={session.user.id}
          studentId={session.user.student.id}
        />
      </section>
    </section>
  );
}
