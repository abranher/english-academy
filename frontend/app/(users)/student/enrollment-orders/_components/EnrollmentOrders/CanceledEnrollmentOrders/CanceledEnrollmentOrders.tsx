"use client";

import { useQuery } from "@tanstack/react-query";
import { EnrollmentOrderStatus } from "@/types/enums";
import { Course, EnrollmentOrder, Student, User } from "@/types/models";
import { getTutorEnrollmentOrdersByStatus } from "@/services/network/enrollment-orders";

import { MiniOrderCard } from "../../MiniOrderCard";

import {
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import { Separator } from "@/components/shadcn/ui/separator";
import { Skeleton } from "@/components/shadcn/ui/skeleton";
import { FolderOpen } from "lucide-react";

export function CanceledEnrollmentOrders({ studentId }: { studentId: string }) {
  const {
    isPending,
    data: enrollmentOrders,
    isError,
  } = useQuery<
    | (EnrollmentOrder & {
        student: Student & { user: User };
        course: Course;
      })[]
    | []
  >({
    queryKey: ["tutor_enrollment_orders", EnrollmentOrderStatus.CANCELED],
    queryFn: () =>
      getTutorEnrollmentOrdersByStatus(EnrollmentOrderStatus.CANCELED, tutorId),
  });

  if (isError) return <div>Ocurrió un error al cargar las órdenes</div>;

  return (
    <>
      <CardHeader>
        <CardTitle>Listado de órdenes de inscripción canceladas</CardTitle>
        <CardDescription>
          En esta sección encontrarás todas las órdenes de inscripción
          canceladas.
        </CardDescription>
      </CardHeader>

      <Separator className="my-4" />

      <section className="flex w-full flex-wrap gap-3">
        {isPending ? (
          [1, 2, 3].map((i) => <Skeleton key={i} className="w-44 rounded-xl" />)
        ) : enrollmentOrders.length > 0 ? (
          enrollmentOrders.map((enrollmentOrder) => (
            <MiniOrderCard
              key={enrollmentOrder.id}
              enrollmentOrder={enrollmentOrder}
            />
          ))
        ) : (
          <section className="w-full text-zinc-700 dark:text-zinc-200 py-4">
            <h2 className="flex justify-center flex-col items-center">
              <FolderOpen className="w-24 h-24" />
              No hay órdenes canceladas.
            </h2>
          </section>
        )}
      </section>
    </>
  );
}
