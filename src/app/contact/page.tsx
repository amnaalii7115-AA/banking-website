import type { Metadata } from "next";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactForm from "@/components/sections/home/ContactForm";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Contact Us",

  description:
    "Contact the YourBank team for questions about accounts, banking services and business solutions.",
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