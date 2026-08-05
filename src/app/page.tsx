import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import Hero from "@/components/sections/home/Hero";
import Products from "@/components/sections/home/Products";
import UseCases from "@/components/sections/home/UseCases";
import Features from "@/components/sections/home/Features";
import FAQ from "@/components/sections/home/FAQ";
import Testimonials from "@/components/sections/home/Testimonials";
import CTA from "@/components/sections/home/CTA";

import Reveal from "@/components/ui/Reveal";

export default function Home() {
  return (
    <main>
      <Navbar />

      <Hero />

      <Reveal>
        <Products />
      </Reveal>

      <Reveal>
        <UseCases />
      </Reveal>

      <Reveal>
        <Features />
      </Reveal>

      <Reveal>
        <FAQ />
      </Reveal>

      <Reveal>
        <Testimonials />
      </Reveal>

      <Reveal>
        <CTA />
      </Reveal>

      <Footer />
    </main>
  );
}