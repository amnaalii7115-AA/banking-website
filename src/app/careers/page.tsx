import Navbar from "@/components/layout/Navbar";
import CareersHero from "@/components/sections/careers/CareersHero1";
import Values from "@/components/sections/careers/Values";
import Benefits from "@/components/sections/careers/Benefits";
import JobOpenings from "@/components/sections/careers/JobOpenings";
import FAQ from "@/components/sections/home/FAQ";
import CareersCTA from "@/components/sections/careers/CareersCTA";
import Footer from "@/components/layout/Footer";

export default function CareersPage() {
  return (
    <main>
      <Navbar />
      <CareersHero />
      <Values />
      <Benefits />
      <JobOpenings />
      <FAQ />
      <CareersCTA />
      <Footer />
    </main>
  );
}