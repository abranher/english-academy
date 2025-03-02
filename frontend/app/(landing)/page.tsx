import AboutSection from "./_components/AboutSection";
import Hero from "./_components/Hero";
import SectionDivider from "./_components/common/SectionDivider";
import TutorSection from "./_components/TutorSection";
import FeaturedCoursesSection from "./_components/FeaturedCoursesSection";

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
    </>
  );
}
