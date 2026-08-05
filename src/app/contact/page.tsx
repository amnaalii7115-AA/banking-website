
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactForm from "@/components/sections/home/ContactForm";
import Reveal from "@/components/ui/Reveal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact the YourBank team for banking information, support and general enquiries.",
};

export default function ContactPage() {
  return (
    <main>
      <Navbar />

      <Reveal>
        <ContactForm />
      </Reveal>

      <Footer />
    </main>
  );
}