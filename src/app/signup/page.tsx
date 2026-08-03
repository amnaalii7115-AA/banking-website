import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SignUpForm from "@/components/sections/signup/SignUpForm";
import Testimonials from "@/components/sections/home/Testimonials";

export default function SignUpPage() {
  return (
    <main>
      <Navbar />
      <SignUpForm />
      <Testimonials />
      <Footer />
    </main>
  );
}