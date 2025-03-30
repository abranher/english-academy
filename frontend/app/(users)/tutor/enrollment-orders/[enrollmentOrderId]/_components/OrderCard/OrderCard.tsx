"use client";

import Link from "next/link";

import { assetImg } from "@/libs/asset";
import {
  Category,
  Course,
  EnrollmentOrder,
  EnrollmentOrderHistory,
  Price,
  Student,
  SubCategory,
  User,
} from "@/types/models";
import { formatDate } from "@/libs/date";
import { Chip, Image } from "@heroui/react";
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
    course: Course & {
      price: Price;
      category: Category;
      subcategory: SubCategory;
    };
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
          <Title size="lg">Curso seleccionado:</Title>
          <article className="col-span-7 flex items-start gap-4">
            <div className="aspect-video w-44 shrink-0">
              <Image
                src={assetImg(enrollmentOrder.course.image)}
                alt={enrollmentOrder.course.title}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="flex flex-col gap-3 w-full">
              <h3 className="text-base font-bold text-gray-800 dark:text-zinc-50">
                {`${enrollmentOrder.course.title} - ${enrollmentOrder.course.subtitle}`}
              </h3>

              <CardTitle>
                {formatPrice(enrollmentOrder.course.price.amount)}
              </CardTitle>

              <div className="flex gap-2">
                <Chip color="danger" size="lg">
                  {enrollmentOrder.course.category.title}
                </Chip>
                <Chip color="primary" size="lg">
                  {enrollmentOrder.course.subcategory.title}
                </Chip>
              </div>
            </div>
          </article>
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
