"use client";

import Image from "next/image";
import Link from "next/link";
import axios from "@/config/axios";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardTitle } from "@/components/shadcn/ui/card";
import { Course } from "@/types/models/Course";
import { formatPrice } from "@/libs/format";
import asset from "@/libs/asset";
import { DollarSign, Star, Users } from "lucide-react";
import { Badge } from "@/components/shadcn/ui/badge";

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
      <section className="grid gap-8 sm:grid-cols-1 md:grid-cols-3 2xl:grid-cols-3">
        {data &&
          data.map((course: Course) => (
            <>
              <Link href={`/tutor/courses/${course.id}`}>
                <Card className="h-44">
                  <CardContent className="py-6">
                    <span className="block text-xs text-gray-500 dark:text-gray-400">
                      7 de Octubre del 2024
                    </span>

                    <h3 className="mt-0.5 text-lg font-medium text-gray-900 dark:text-white">
                      {course.title}
                    </h3>

                    <div className="mt-4 flex flex-wrap gap-1">
                      <Badge>Writting</Badge>
                      <Badge>Reading</Badge>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </>
          ))}
      </section>
    </>
  );
}
