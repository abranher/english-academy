import React from "react";
import Features from "@/components/landing-page/Features/Features";
import AboutSection from "@/components/landing-page/AboutSection";
import Hero from "@/components/landing-page/Hero";
import SectionDivider from "@/components/landing-page/common/SectionDivider";

export default function LandingPage() {
  return (
    <>
      <Hero />
      <SectionDivider />

      <Features />
      <SectionDivider />

      <AboutSection />
      <SectionDivider />
    </>
  );
}
