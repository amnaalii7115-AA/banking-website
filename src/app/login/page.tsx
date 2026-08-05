import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LoginForm from "@/components/sections/login/LoginForm";
import Testimonials from "@/components/sections/home/Testimonials";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description:
    "Securely log in to access and manage your YourBank account.",
};

export default function LoginPage() {
  return (
    <main>
      <Navbar />
      <LoginForm />
      <Testimonials />
      <Footer />
    </main>
  );
}