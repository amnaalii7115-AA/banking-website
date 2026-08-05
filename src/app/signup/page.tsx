import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SignUpForm from "@/components/sections/signup/SignUpForm";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
  description:
    "Create your YourBank account and access secure personalized banking services.",
};

export default function SignUpPage() {
  return (
    <main>
      <Navbar />
      <SignUpForm />
      <Footer />
    </main>
  );
}