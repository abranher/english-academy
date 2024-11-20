"use client";

import { Card, CardContent } from "@/components/shadcn/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/shadcn/ui/carousel";
import BoxBase from "@/components/common/BoxBase";
import Title from "@/components/common/Title";
import { Badge } from "@/components/shadcn/ui/badge";
import { Button } from "@/components/shadcn/ui/button";
import { ShoppingCart, XIcon } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { Course } from "@/types/models/Course";

export default function FeaturedCoursesSection({
  courses,
}: {
  courses: Course[];
}) {
  const cart = useCartStore((state) => state.cart);
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const checkCourseInCart = (course: Course) =>
    cart.some((item) => item.id === course.id);

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
            {courses &&
              courses.map((course) => {
                const isCourseInCart = checkCourseInCart(course);

                return (
                  <CarouselItem
                    key={course.id}
                    className="p-3 md:basis-1/2 lg:basis-1/3"
                  >
                    <Card>
                      <a href={`/courses/${course.id}`}>
                        <div className="relative h-56 m-2.5 overflow-hidden text-white rounded-md">
                          <img
                            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1471&amp;q=80"
                            alt="card-image"
                          />
                        </div>

                        <div className="p-4">
                          <h6 className="mb-2 text-slate-800 text-xl font-semibold">
                            {course.title}
                          </h6>
                          <h2 className="text-3xl">{course.price}</h2>
                        </div>

                        <div className="px-4">
                          <Badge>POPULAR</Badge>
                        </div>
                      </a>

                      <div className="p-4 w-full">
                        <Button
                          className="flex gap-2 w-full"
                          variant={isCourseInCart ? "outline" : "default"}
                          onClick={() => {
                            isCourseInCart
                              ? removeFromCart(course)
                              : addToCart(course);
                          }}
                        >
                          {isCourseInCart ? (
                            <>
                              <XIcon className="h-4 w-4" />
                              Remover
                            </>
                          ) : (
                            <>
                              <ShoppingCart className="h-4 w-4" />
                              Añadir al carrito
                            </>
                          )}
                        </Button>
                      </div>
                    </Card>
                  </CarouselItem>
                );
              })}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </BoxBase>
    </>
  );
}
