import SectionDivider from "./_components/common/SectionDivider";
import { AboutSection } from "./_components/AboutSection";
import { Hero } from "./_components/Hero";
import { FeaturedCoursesSection } from "./_components/FeaturedCoursesSection";
import { TutorSection } from "./_components/TutorSection";
import { TutorPricingSection } from "./_components/TutorPricingSection";

export default function LandingPage() {
  return (
    <>
      <Hero />
      <SectionDivider />

      <FeaturedCoursesSection />
      <SectionDivider />

      <AboutSection />
      <SectionDivider />

      <TutorSection />
      <SectionDivider />

      <TutorPricingSection />
      <SectionDivider />
    </>
  );
}
