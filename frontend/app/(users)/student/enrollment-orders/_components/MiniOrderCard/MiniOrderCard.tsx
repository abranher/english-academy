"use client";

import Link from "next/link";

import { formatDateForOrders } from "@/libs/date";
import { Course, EnrollmentOrder } from "@/types/models";

import { OrderStatusBadge } from "@/components/enrollment-orders";

import { Button } from "@/components/shadcn/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import { ArrowUpRight } from "lucide-react";
import { truncateString } from "@/libs/format";

export function MiniOrderCard({
  enrollmentOrder,
}: {
  enrollmentOrder: EnrollmentOrder & { course: Course };
}) {
  return (
    <Card>
      <CardHeader>
        <section className="flex flex-col items-center gap-4">
          <section className="flex items-center gap-3">
            <CardTitle>
              Curso: {truncateString(enrollmentOrder.course.title, "xs")}
            </CardTitle>
          </section>

          <section className="flex items-center gap-3">
            <CardDescription>
              {formatDateForOrders(enrollmentOrder.createdAt)}
            </CardDescription>
          </section>

          <section className="flex items-center gap-3">
            <OrderStatusBadge status={enrollmentOrder.status} />
          </section>

          <Link href={`/student/enrollment-orders/${enrollmentOrder.id}`}>
            <Button className="flex gap-2">
              Ver más
              <ArrowUpRight className="opacity-90 w-4" />
            </Button>
          </Link>
        </section>
      </CardHeader>
    </Card>
  );
}
