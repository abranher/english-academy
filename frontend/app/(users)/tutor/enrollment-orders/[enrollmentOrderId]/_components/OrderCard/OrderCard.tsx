"use client";

import Link from "next/link";

import {
  Course,
  EnrollmentOrder,
  EnrollmentOrderHistory,
  Price,
  Student,
  User,
} from "@/types/models";
import { formatDate } from "@/libs/date";
import { formatPrice, truncateString } from "@/libs/format";

import { Title } from "@/components/common/Title";
import { OrderStatusBadge } from "@/components/enrollment-orders";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import { Separator } from "@/components/shadcn/ui/separator";
import { Button } from "@/components/shadcn/ui/button";

export function OrderCard({
  enrollmentOrder,
}: {
  enrollmentOrder: EnrollmentOrder & {
    student: Student & { user: User };
    course: Course & { price: Price };
    enrollmentOrderHistory: EnrollmentOrderHistory[] | [];
  };
}) {
  return (
    <Card>
      <CardHeader>
        <section className="flex justify-between">
          <section className="flex items-center gap-3">
            <CardTitle>ID: </CardTitle>
            <CardDescription>
              {truncateString(enrollmentOrder.id, "xs")}
            </CardDescription>
          </section>

          <section className="flex items-center gap-3">
            <OrderStatusBadge status={enrollmentOrder.status} />
          </section>
        </section>
      </CardHeader>
      <CardContent>
        <section className="flex flex-col gap-5">
          <Title size="lg">Plan seleccionado:</Title>
          <section>
            <CardTitle>{enrollmentOrder.course.title}</CardTitle>
            <section className="flex gap-2 items-center">
              <Title size="lxl">
                {formatPrice(enrollmentOrder.course.price.amount)}
              </Title>
            </section>
            <CardDescription>
              {enrollmentOrder.course.description}
            </CardDescription>
          </section>
        </section>
        <Separator className="my-4" />

        <section className="flex items-center gap-3">
          <Title size="lg">Estudiante:</Title>
          <Link href={`/admin/tutors/${enrollmentOrder.student.user.id}`}>
            <Button variant="link" size="sm" className="p-0 h-3">
              @{enrollmentOrder.student.user.username}
            </Button>
          </Link>
        </section>
        <Separator className="my-4" />

        <Title size="lg">Datos de Pago:</Title>
        <section className="flex flex-col gap-4">
          <CardDescription className="text-lg flex justify-between">
            Método de pago: <strong>Pago Móvil</strong>
          </CardDescription>
          <Separator />

          <CardDescription className="text-lg flex justify-between">
            Referencia o comprobante de pago:{" "}
            <strong>{enrollmentOrder.paymentReference}</strong>
          </CardDescription>
          <Separator />

          <CardDescription className="text-lg flex justify-between">
            Fecha:
            <strong>{formatDate(enrollmentOrder.createdAt)}</strong>
          </CardDescription>
        </section>
      </CardContent>
    </Card>
  );
}
