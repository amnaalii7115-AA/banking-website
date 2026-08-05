import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AboutHero from "@/components/sections/about/AboutHero";
import MissionVision from "@/components/sections/about/MissionVision";
import PressReleases from "@/components/sections/about/PressReleases";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about YourBank, our mission, vision, values and latest developments.",
};

export default function AboutPage() {
  return (
    <main>
      <Navbar />
      <AboutHero />
      <MissionVision />
      <PressReleases />
      <Footer />
    </main>
  );
}