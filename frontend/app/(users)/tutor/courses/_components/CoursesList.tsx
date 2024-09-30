"use client";

import Image from "next/image";
import Link from "next/link";
import axios from "@/config/axios";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/shadcn/ui/card";
import { Course } from "@/types/models/Course";
import { formatPrice } from "@/libs/format";
import asset from "@/libs/asset";
import { DollarSign, Star, Users } from "lucide-react";

const courseStatistics = [
  {
    label: "Ingresos totales",
    icon: DollarSign,
    value: 234,
  },
  {
    label: "Valoración",
    icon: Star,
    value: 4.7,
  },
  {
    label: "Estudiantes inscritos",
    icon: Users,
    value: 987,
  },
];

export default function CoursesList() {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["tutor_courses"],
    queryFn: () => axios.get("/api/courses").then((response) => response.data),
  });

  console.log(isError);

  if (isLoading) return "loading...";

  console.log(data);

  return (
    <>
      <section className="grid gap-8 sm:grid-cols-1 md:grid-cols-1 2xl:grid-cols-1">
        {data &&
          data.map((course: Course) => (
            <Card
              key={course.id}
              className="flex flex-col justify-center lg:grid lg:grid-cols-2 rounded-lg p-2 gap-4"
            >
              <div className="flex gap-4">
                <Image
                  alt={course.title}
                  width={170}
                  height={45}
                  src={asset(course.imageUrl)}
                  className="aspect-video rounded-md"
                />
              </div>

              <Link href={`/tutor/courses/${course.id}`}>
                <div>
                  <p className="font-medium text-lg">{course.title}</p>
                </div>
                <div>
                  <dd className="text-base text-green-500">
                    {formatPrice(course.price)}
                  </dd>
                </div>
              </Link>

              <div className="grid grid-cols-2">
                {courseStatistics.map((statistic, index) => (
                  <section
                    key={index}
                    className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground"
                  >
                    <statistic.icon />
                    <div className="space-y-1">
                      <p className="text-lg font-medium leading-none">
                        {statistic.label}
                      </p>
                      <p className="text-xl text-muted-foreground">
                        {statistic.value}
                      </p>
                    </div>
                  </section>
                ))}
              </div>
            </Card>
          ))}
      </section>
    </>
  );
}
