import Navbar from "@/components/layout/Navbar";
import SecurityHero from "@/components/sections/security/SecurityHero";
import FAQ from "@/components/sections/home/FAQ";
import SecurityFeatures from "@/components/sections/security/SecurityFeatures";
import Footer from "@/components/layout/Footer";


export default function SecurityPage() {
  return (
    <main>
      <Navbar />
      <SecurityHero />
      <SecurityFeatures />
      <FAQ/>
      <Footer />
    </main>
  );
}