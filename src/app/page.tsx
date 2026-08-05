import type { Metadata } from "next";

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

export const metadata: Metadata = {
  title: "Home | YourBank",
  description:
    "Explore secure and personalized digital banking solutions for individuals and businesses with YourBank.",
};

export default function Home() {
  return (
    <main>
      <Navbar />

      <Hero />

      <Reveal direction="up">
        <Products />
      </Reveal>

      <Reveal direction="left">
        <UseCases />
      </Reveal>

      <Reveal direction="right">
        <Features />
      </Reveal>

      <Reveal direction="up">
        <FAQ />
      </Reveal>

      <Reveal direction="left">
        <Testimonials />
      </Reveal>

      <Reveal direction="up">
        <CTA />
      </Reveal>

      <Footer />
    </main>
  );
}