"use client";

import { Button } from "@/components/shadcn/ui/button";
import { formatPrice } from "@/libs/format";

interface CourseEnrollButtonProps {
  price: number;
  courseId: string;
}

export default function CourseEnrollButton({
  price,
  courseId,
}: CourseEnrollButtonProps) {
  return (
    <Button className="w-full md:w-auto" size="sm">
      Comprar por {formatPrice(price)}
    </Button>
  );
}
