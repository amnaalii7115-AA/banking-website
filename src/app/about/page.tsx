import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AboutHero from "@/components/sections/about/AboutHero";
import MissionVision from "@/components/sections/about/MissionVision";
import PressReleases from "@/components/sections/about/PressReleases";

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