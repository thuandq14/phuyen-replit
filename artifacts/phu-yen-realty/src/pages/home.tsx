import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { FeaturedProperties } from "@/components/FeaturedProperties";
import { AllProperties } from "@/components/AllProperties";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="bg-background text-foreground min-h-screen font-sans">
      <Navbar />
      <main>
        <Hero />
        <FeaturedProperties />
        <AllProperties />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
