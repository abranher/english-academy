"use client";

import Features from "./_components/Features/Features";
import AboutSection from "./_components/AboutSection";
import Hero from "./_components/Hero";
import SectionDivider from "./_components/common/SectionDivider";
import TutorSection from "./_components/TutorSection";
import FeaturedCoursesSection from "./_components/FeaturedCoursesSection";
import { useQuery } from "@tanstack/react-query";
import { getCourses } from "./_services/getCourses";

export default function LandingPage() {
  const { data: courses } = useQuery({
    queryKey: ["courses"],
    queryFn: getCourses,
  });

  return (
    <>
      <Hero />
      <SectionDivider />

      <FeaturedCoursesSection courses={courses} />
      <SectionDivider />

      <Features />
      <SectionDivider />

      <AboutSection />
      <SectionDivider />

      <TutorSection />
      <SectionDivider />
    </>
  );
}
