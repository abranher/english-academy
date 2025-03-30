"use client";

import { useParams } from "next/navigation";

import { useQuery } from "@tanstack/react-query";
import { getTutorEnrollmentOrder } from "@/services/network/enrollment-orders";
import {
  Course,
  EnrollmentOrder,
  EnrollmentOrderHistory,
  Price,
  Student,
  User,
} from "@/types/models";

import { StatusManagementHistory } from "../StatusManagementHistory";

import { CardDescription, CardTitle } from "@/components/shadcn/ui/card";
import { Separator } from "@/components/shadcn/ui/separator";
import { OrderCard } from "../OrderCard";

export function Order({ tutorId }: { tutorId: string }) {
  const { enrollmentOrderId } = useParams();

  const {
    isPending,
    data: enrollmentOrder,
    isError,
  } = useQuery<
    EnrollmentOrder & {
      student: Student & { user: User };
      course: Course & { price: Price };
      enrollmentOrderHistory: EnrollmentOrderHistory[] | [];
    }
  >({
    queryKey: ["tutor_enrollment_orders", enrollmentOrderId],
    queryFn: () =>
      getTutorEnrollmentOrder(enrollmentOrderId as string, tutorId),
  });

  if (isPending) return <>Cargando...</>;
  if (isError) return <div>No se pudo cargar la órden de inscripción.</div>;

  return (
    <>
      <section className="flex flex-col gap-1">
        <CardTitle>Órden de suscripción</CardTitle>
        <CardDescription>
          Accede y gestiona la información de la órden de suscripción.
        </CardDescription>
      </section>

      <Separator />

      <OrderCard enrollmentOrder={enrollmentOrder} />

      <Separator />

      <StatusManagementHistory
        enrollmentOrderHistory={enrollmentOrder.enrollmentOrderHistory}
        enrollmentOrder={enrollmentOrder}
      />
    </>
  );
}
