import Features from "./_components/Features/Features";
import AboutSection from "./_components/AboutSection";
import Hero from "./_components/Hero";
import SectionDivider from "./_components/common/SectionDivider";
import TutorSection from "./_components/TutorSection";
import FeaturedCoursesSection from "./_components/FeaturedCoursesSection";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shadcn/ui/popover";
import { Button } from "@/components/shadcn/ui/button";
import { cn } from "@/libs/shadcn/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/shadcn/ui/calendar";

export default function LandingPage() {
  return (
    <>
      <Hero />
      <SectionDivider />

      <FeaturedCoursesSection />
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
