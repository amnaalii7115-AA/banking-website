import type { Metadata } from "next";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AccountCreationForm from "@/components/sections/open-account/AccountCreationForm";

export const metadata: Metadata = {
  title: "Open Account",
  description:
    "Create your personal or business bank account with YourBank.",
};

export default function OpenAccountPage() {
  return (
    <main>
      <Navbar />

      <AccountCreationForm />

      <Footer />
    </main>
  );
}