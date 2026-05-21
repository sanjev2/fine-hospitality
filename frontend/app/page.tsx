// src/app/page.tsx

import CinematicOpening from "@/app/sections/CinematicOpening";
import Navbar from "@/app/components/layout/Navbar";
import HeroSection from "@/app/sections/HeroSection";
import AboutSection from "@/app/sections/AboutSection";
import CoursesSection from "@/app/sections/CoursesSection";
import GallerySection from "@/app/sections/GallerySection";
import TestimonialsSection from "@/app/sections/TestimonialsSection";
import WhyChooseUsSection from "@/app/sections/WhyChooseUsSection";
import ContactSection from "@/app/sections/ContactSection";
import Footer from "@/app/components/layout/Footer";
import InstructorsSection from "@/app/sections/InstructorsSection";
import MissionCocktailsSection from "@/app/sections/MissionCocktailsSection";
import EditorialSchoolSection from "@/app/sections/EditorialSchoolSection";


export default function HomePage() {
  return (
    <>
      <CinematicOpening />
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <MissionCocktailsSection />
        <EditorialSchoolSection />
        <CoursesSection />
        <GallerySection />
        <InstructorsSection />
        <TestimonialsSection />
        <WhyChooseUsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}