"use client";

import Link from "next/link";

import { Category, Course, Price, SubCategory } from "@/types/models";
import { formatPrice } from "@/libs/format";
import { useStepEnrollmentStore } from "@/services/store/student/enrollment";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import { Button } from "@/components/shadcn/ui/button";
import { Separator } from "@/components/shadcn/ui/separator";
import { Input } from "@/components/shadcn/ui/input";
import { Chip, Image } from "@heroui/react";
import { assetImg } from "@/libs/asset";

export function StepOne({
  course,
}: {
  course: Course & {
    price: Price;
    category: Category;
    subcategory: SubCategory;
  };
}) {
  const nextStep = useStepEnrollmentStore((state) => state.nextStep);
  const resetSteps = useStepEnrollmentStore((state) => state.resetSteps);

  return (
    <>
      <section className="text-center mb-6">
        <CardTitle className="mb-3">
          Confirmación de la Orden de inscripción
        </CardTitle>
        <CardDescription>
          Verifica el curso y haz clic en continuar.
        </CardDescription>
      </section>

      <section className="lg:col-span-2 space-y-4">
        <div className="grid grid-cols-8 items-start gap-4">
          <Link
            href={`/courses/${course.id}`}
            className="col-span-7 flex items-start gap-4"
          >
            <div className="aspect-video w-52 shrink-0">
              <Image
                src={assetImg(course.image)}
                alt={course.title}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="flex flex-col gap-3 w-full">
              <h3 className="text-sm font-bold text-gray-800">
                {`${course.title} - ${course.subtitle}`}
              </h3>

              <h4 className="text-lg max-sm:text-base font-bold text-gray-800">
                {formatPrice(course.price?.amount ?? 0)}
              </h4>

              <div className="flex gap-2">
                <Chip color="danger" size="lg">
                  {course.category?.title}
                </Chip>
                <Chip color="primary" size="lg">
                  {course.subcategory?.title}
                </Chip>
              </div>
            </div>
          </Link>
        </div>
      </section>

      <Separator className="my-4" />

      <section className="flex flex-col py-4">
        <Card>
          <CardHeader>
            <CardTitle>Código de promoción:</CardTitle>
          </CardHeader>

          <CardContent>
            <section className="flex gap-3 py-2">
              <Input />
              <Button>Aplicar</Button>
            </section>
            <CardDescription>Nota: solo puedes usar una vez</CardDescription>
          </CardContent>
        </Card>

        <Separator className="my-4" />

        <article className="flex justify-between">
          <CardDescription>Subtotal:</CardDescription>
          <CardDescription className="font-bold text-lg text-zinc-800">
            {formatPrice(course.price.amount)}
          </CardDescription>
        </article>

        <article className="flex justify-between">
          <CardDescription>Descuento:</CardDescription>
          <CardDescription className="font-bold text-lg text-zinc-800">
            $0.00
          </CardDescription>
        </article>
        <Separator className="my-4" />

        <article className="flex justify-between">
          <CardDescription>Total a pagar:</CardDescription>
          <CardDescription className="font-bold text-lg text-zinc-800">
            {formatPrice(course.price.amount)}
          </CardDescription>
        </article>
      </section>

      <article className="w-full flex justify-between mt-5">
        <Button variant="outline" asChild>
          <Link href={"/tutor/plans"}>Volver</Link>
        </Button>

        <Button onClick={() => resetSteps()}>Reset</Button>

        <Button
          onClick={() => {
            nextStep();
          }}
        >
          Continuar
        </Button>
      </article>
    </>
  );
}
