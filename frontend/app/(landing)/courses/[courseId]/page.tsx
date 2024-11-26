"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { assetVideo } from "@/libs/asset";
import { getCourse } from "./_services/getCourse";

import ReactPlayer from "react-player";
import { Skeleton } from "@/components/shadcn/ui/skeleton";
import {
  BookOpen,
  ClipboardList,
  FileVideo,
  Loader2,
  ShoppingCart,
  Video,
  XIcon,
} from "lucide-react";
import { formatPrice } from "@/libs/format";
import { Button } from "@/components/shadcn/ui/button";
import { useCartStore } from "@/store/cart";
import { Course } from "@/types/models/Course";
import { Card } from "@/components/shadcn/ui/card";
import { Image } from "@nextui-org/react";
import { Star } from "@/components/icons/Star";
import Preview from "@/components/shadcn/ui/preview";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/shadcn/ui/accordion";
import { Chapter } from "@/types/models/Chapter";
import { LessonType } from "@/types/enums";

export default function CourseDetailsPage() {
  const [playerReady, setPlayerReady] = useState(false);

  const { courseId } = useParams();

  const { isPending, data: course } = useQuery({
    queryKey: ["course-details-page"],
    queryFn: () => getCourse(courseId as string),
  });

  const cart = useCartStore((state) => state.cart);
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const checkCourseInCart = (course: Course) =>
    cart.some((item) => item.id === course.id);

  console.log(course);

  const isCourseInCart = checkCourseInCart(course);

  useEffect(() => {
    setPlayerReady(true);
  }, []);

  return (
    <>
      <div className="bg-zinc-950 py-16 px-20">
        <div className="max-w-[1536px] w-full mx-auto">
          <div className="grid lg:grid-cols-2 justify-center items-center gap-10">
            {!isPending ? (
              <>
                <div>
                  <div className="text-zinc-50 flex flex-col gap-4">
                    <h6 className="mb-2 text-4xl font-semibold">
                      {`${course.title} - ${course.subtitle}`}
                    </h6>

                    <h2 className="text-6xl font-bold">
                      {formatPrice(course.price?.amount ?? 0)}
                    </h2>

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

                  <div className="flex my-10">
                    <Button
                      className="flex gap-4 items-center text-2xl py-9"
                      variant={isCourseInCart ? "default" : "outline"}
                      size="lg"
                      onClick={() => {
                        isCourseInCart
                          ? removeFromCart(course)
                          : addToCart(course);
                      }}
                    >
                      {isCourseInCart ? (
                        <>
                          <XIcon className="h-8 w-8" />
                          Remover
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="h-8 w-8" />
                          Añadir al carrito
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                <div className="max-lg:mt-12 h-full">
                  {course.trailer ? (
                    <>
                      {playerReady ? (
                        <div className="aspect-video rounded-lg">
                          <ReactPlayer
                            controls
                            width={"100%"}
                            height={"100%"}
                            url={assetVideo(course.trailer)}
                          />
                        </div>
                      ) : (
                        <>
                          <Skeleton className="w-full h-full flex justify-center items-center">
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          </Skeleton>
                        </>
                      )}
                    </>
                  ) : (
                    <div className="grid aspect-video place-items-center rounded-lg bg-zinc-200 dark:bg-zinc-800">
                      <Video className="h-9 w-9 text-gray-600 aspect-video" />
                    </div>
                  )}
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center">
        <section className="w-full max-w-[1536px] p-8">
          <section className="w-full flex">
            <div className="lg:grid lg:grid-cols-7 w-full space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
              <Card className="lg:col-span-4 flex w-full flex-col gap-4 p-8">
                {!isPending ? (
                  <>
                    <section>
                      <h2 className="text-2xl font-semibold">Descripción</h2>
                      <Preview value={course.description} />
                    </section>
                  </>
                ) : (
                  <></>
                )}

                <div className="mt-8">
                  <h3 className="text-xl font-bold text-gray-800">
                    Reseñas(10)
                  </h3>
                  <div className="space-y-3 mt-4">
                    <div className="flex items-center">
                      <p className="text-sm text-gray-800 font-bold">5.0</p>
                      <Star />
                      <div className="bg-gray-300 rounded w-full h-2 ml-3">
                        <div className="w-2/3 h-full rounded bg-yellow-400"></div>
                      </div>
                      <p className="text-sm text-gray-800 font-bold ml-3">
                        66%
                      </p>
                    </div>

                    <div className="flex items-center">
                      <p className="text-sm text-gray-800 font-bold">4.0</p>
                      <Star />

                      <div className="bg-gray-300 rounded w-full h-2 ml-3">
                        <div className="w-1/3 h-full rounded bg-yellow-400"></div>
                      </div>
                      <p className="text-sm text-gray-800 font-bold ml-3">
                        33%
                      </p>
                    </div>

                    <div className="flex items-center">
                      <p className="text-sm text-gray-800 font-bold">3.0</p>
                      <Star />

                      <div className="bg-gray-300 rounded w-full h-2 ml-3">
                        <div className="w-1/6 h-full rounded bg-yellow-400"></div>
                      </div>
                      <p className="text-sm text-gray-800 font-bold ml-3">
                        16%
                      </p>
                    </div>

                    <div className="flex items-center">
                      <p className="text-sm text-gray-800 font-bold">2.0</p>
                      <Star />

                      <div className="bg-gray-300 rounded w-full h-2 ml-3">
                        <div className="w-1/12 h-full rounded bg-yellow-400"></div>
                      </div>
                      <p className="text-sm text-gray-800 font-bold ml-3">8%</p>
                    </div>

                    <div className="flex items-center">
                      <p className="text-sm text-gray-800 font-bold">1.0</p>
                      <Star />

                      <div className="bg-gray-300 rounded w-full h-2 ml-3">
                        <div className="w-[6%] h-full rounded bg-yellow-400"></div>
                      </div>
                      <p className="text-sm text-gray-800 font-bold ml-3">6%</p>
                    </div>
                  </div>

                  <section>
                    <div className="flex items-start m-9 gap-3">
                      <Image
                        src="https://readymadeui.com/team-2.webp"
                        alt="hola"
                        className="w-28 h-20 rounded-full border-2 border-white"
                      />
                      <div>
                        <h4 className="text-sm font-bold">John Doe</h4>
                        <div className="flex space-x-1 mt-1">
                          <Star />
                          <Star />
                          <Star />
                          <Star />
                          <Star />

                          <p className="text-xs !ml-2 font-semibold">
                            2 mins ago
                          </p>
                        </div>
                        <p className="text-xs mt-4">
                          The service was amazing. I never had to wait that long
                          for my food. The staff was friendly and attentive, and
                          the delivery was impressively prompt.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start m-9 gap-3">
                      <Image
                        src="https://readymadeui.com/team-2.webp"
                        alt="hola"
                        className="w-28 h-20 rounded-full border-2 border-white"
                      />
                      <div>
                        <h4 className="text-sm font-bold">John Doe</h4>
                        <div className="flex space-x-1 mt-1">
                          <Star />
                          <Star />
                          <Star />
                          <Star />
                          <Star />

                          <p className="text-xs !ml-2 font-semibold">
                            2 mins ago
                          </p>
                        </div>
                        <p className="text-xs mt-4">
                          The service was amazing. I never had to wait that long
                          for my food. The staff was friendly and attentive, and
                          the delivery was impressively prompt.
                        </p>
                      </div>
                    </div>
                  </section>
                </div>
              </Card>

              <aside className="hidden lg:block lg:col-span-3 w-full pr-10">
                <h2 className="text-2xl font-semibold py-3">Capítulos</h2>

                <Accordion type="single" collapsible className="w-full">
                  {!isPending ? (
                    <>
                      {course.chapters.map((chapter: Chapter) => (
                        <>
                          <AccordionItem
                            key={chapter.id}
                            value={chapter.id}
                            className="border px-4"
                          >
                            <AccordionTrigger>
                              <div className="flex gap-4">
                                <BookOpen />
                                {chapter.title}
                              </div>
                            </AccordionTrigger>
                            <AccordionContent>
                              <section className="flex flex-col">
                                {chapter.lessons.map((lesson) => (
                                  <>
                                    <div
                                      key={lesson.id}
                                      className="flex gap-4 text-lg border p-4"
                                    >
                                      {lesson.type === LessonType.CLASS && (
                                        <>
                                          <FileVideo className="h-5 w-5" />
                                          {`Clase: ${lesson.class.title}`}
                                        </>
                                      )}

                                      {lesson.type === LessonType.QUIZ && (
                                        <>
                                          <ClipboardList className="h-5 w-5" />
                                          {`Quiz: ${lesson.quiz.title}`}
                                        </>
                                      )}
                                    </div>
                                  </>
                                ))}
                              </section>
                            </AccordionContent>
                          </AccordionItem>
                        </>
                      ))}
                    </>
                  ) : (
                    <></>
                  )}
                </Accordion>
              </aside>
            </div>
          </section>
        </section>
      </div>
    </>
  );
}
