"use client";

import React, { useState } from "react";
import CourseCard from "./CourseCard";
import axios from "@/config/axios";

export default function CoursesList() {
  const [courses, setCourses] = useState([]);
  const getData = async () => {
    try {
      const response = await axios.get(`/api/courses`);
      setCourses(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  getData();

  return (
    <>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        {courses !== undefined &&
          courses.map((course) => (
            <CourseCard
              key={course.id}
              id={course.id}
              title={course.title}
              imageUrl={course.imageUrl!}
              chaptersLength={course.chapters.length}
              price={course.price!}
              progress={course.progress}
              level={course?.level?.title!}
            />
          ))}
      </div>
      {courses !== undefined && courses.length === 0 && (
        <div className="text-center text-sm text-muted-foreground mt-10">
          No se encontró ningún curso
        </div>
      )}
    </>
  );
}
