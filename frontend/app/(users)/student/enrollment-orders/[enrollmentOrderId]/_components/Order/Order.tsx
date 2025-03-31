"use client";

import { useParams } from "next/navigation";

import { useQuery } from "@tanstack/react-query";
import { getEnrollmentOrder } from "@/services/network/enrollment-orders";
import {
  Category,
  Course,
  EnrollmentOrder,
  EnrollmentOrderHistory,
  Price,
  SubCategory,
} from "@/types/models";

import { StatusManagementHistory } from "../StatusManagementHistory";
import { OrderCard } from "../OrderCard";

import { CardDescription, CardTitle } from "@/components/shadcn/ui/card";
import { Separator } from "@/components/shadcn/ui/separator";

export function Order({ studentId }: { studentId: string }) {
  const { enrollmentOrderId } = useParams();

  const {
    isPending,
    data: enrollmentOrder,
    isError,
  } = useQuery<
    EnrollmentOrder & {
      course: Course & {
        price: Price;
        category: Category;
        subcategory: SubCategory;
      };
      enrollmentOrderHistory: EnrollmentOrderHistory[] | [];
    }
  >({
    queryKey: ["student_subscription_order", enrollmentOrderId],
    queryFn: () => getEnrollmentOrder(enrollmentOrderId as string, studentId),
  });

  if (isPending) return <>Cargando...</>;
  if (isError) return <div>No se pudo cargar la órden de inscripción.</div>;

  return (
    <>
      <section className="flex flex-col gap-1">
        <CardTitle>Órden de inscripción</CardTitle>
        <CardDescription>
          Accede y gestiona la información de la órden de inscripción.
        </CardDescription>
      </section>

      <Separator />

      <OrderCard enrollmentOrder={enrollmentOrder} />

      <Separator />

      <StatusManagementHistory
        studentId={studentId}
        enrollmentOrderHistory={enrollmentOrder.enrollmentOrderHistory}
      />
    </>
  );
}
