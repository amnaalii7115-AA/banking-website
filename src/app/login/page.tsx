import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LoginForm from "@/components/sections/login/LoginForm";
import Testimonials from "@/components/sections/home/Testimonials";

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