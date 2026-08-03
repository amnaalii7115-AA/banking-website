import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import Hero from "@/components/sections/home/Hero";
import Products from "@/components/sections/home/Products";
import UseCases from "@/components/sections/home/UseCases";
import Features from "@/components/sections/home/Features";
import FAQ from "@/components/sections/home/FAQ";
import Testimonials from "@/components/sections/home/Testimonials";
import CTA from "@/components/sections/home/CTA";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Products />
      <UseCases />
      <Features />
      <FAQ />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  );
}