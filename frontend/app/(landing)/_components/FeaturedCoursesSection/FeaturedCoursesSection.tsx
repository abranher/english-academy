"use client";

import Link from "next/link";

import { Course, Tutor } from "@/types/models";
import { useQuery } from "@tanstack/react-query";
import { assetImg } from "@/libs/asset";
import { formatPrice } from "@/libs/format";
import { Chip, Image } from "@heroui/react";
import { getLandingCourses } from "../../_services/getLandingCourses";

import BoxBase from "@/components/common/BoxBase";
import { Star } from "@/components/icons/Star";
import { Title } from "@/components/common/Title";
import { FeaturedCoursesSkeleton } from "./FeaturedCoursesSkeleton";

import { Card } from "@/components/shadcn/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/shadcn/ui/carousel";
import { Button } from "@/components/shadcn/ui/button";
import { ShoppingCart } from "lucide-react";

export function FeaturedCoursesSection() {
  const {
    isPending,
    data: courses,
    isError,
  } = useQuery<(Course & { tutor: Tutor })[] | []>({
    queryKey: ["courses_landing_page"],
    queryFn: getLandingCourses,
  });

  if (isPending) return <FeaturedCoursesSkeleton />;
  if (isError) return <>Ha ocurrido un error al cargar los cursos</>;
  if (courses.length === 0) return;

  return (
    <>
      <BoxBase size="xl">
        <section className="mb-12">
          <Title size="lxl">Una gran variedad de cursos.</Title>

          <p className="text-2xl p-6">
            Amplía tus conocimientos con nuestra biblioteca de más de 250,000
            cursos en video, en constante crecimiento.
          </p>
        </section>

        <Carousel className="w-full">
          <CarouselContent className="-ml-1">
            <>
              {courses.map((course) => {
                return (
                  <CarouselItem
                    key={course.id}
                    className="p-3 md:basis-1/2 lg:basis-1/3"
                  >
                    <Card>
                      <Link
                        href={`/courses/${course.id}/tutor/${course.tutorId}`}
                      >
                        <div className="relative aspect-video m-2.5 overflow-hidden text-white rounded-md">
                          <Image
                            src={assetImg(course.image)}
                            alt="card-image"
                          />
                        </div>

                        <div className="px-4">
                          <h2 className="text-3xl font-bold">
                            {formatPrice(course.price?.amount ?? 0)}
                          </h2>

                          <h6 className="mb-2 text-zinc-800 dark:text-zinc-50 text-xl md:text-md font-semibold">
                            {`${course.title} - ${course.subtitle}`}
                          </h6>

                          <div className="flex items-center my-3">
                            <Star className="w-8 h-8 fill-yellow-300 me-1" />
                            <Star className="w-8 h-8 fill-yellow-300 me-1" />
                            <Star className="w-8 h-8 fill-yellow-300 me-1" />
                            <Star className="w-8 h-8 fill-yellow-300 me-1" />
                            <Star className="w-8 h-8 fill-gray-300 me-1 dark:fill-gray-500" />

                            <p className="ms-1 text-lg font-medium text-gray-400">
                              4.95 de 5
                            </p>
                          </div>
                        </div>

                        <div className="px-4 flex gap-2">
                          <Chip color="danger" size="lg">
                            {course.category?.title}
                          </Chip>
                          <Chip color="primary" size="lg">
                            {course.subcategory?.title}
                          </Chip>
                        </div>
                      </Link>

                      <div className="p-4 w-full">
                        <Link
                          href={`/courses/${course.id}/tutor/${course.tutorId}/checkout`}
                        >
                          <Button size="lg" className="flex gap-2 w-full text-xl">
                            <ShoppingCart className="h-6 w-6" />
                            Comprar ahora
                          </Button>
                        </Link>
                      </div>
                    </Card>
                  </CarouselItem>
                );
              })}
            </>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </BoxBase>
    </>
  );
}
