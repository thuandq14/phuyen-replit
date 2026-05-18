import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <div 
          className="text-2xl font-serif font-bold text-accent cursor-pointer"
          onClick={() => scrollTo("hero")}
        >
          Phu Yen Realty
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          <button onClick={() => scrollTo("featured")} className="text-sm font-medium hover:text-primary transition-colors">Dự Án Nổi Bật</button>
          <button onClick={() => scrollTo("properties")} className="text-sm font-medium hover:text-primary transition-colors">Tất Cả Dự Án</button>
          <button onClick={() => scrollTo("about")} className="text-sm font-medium hover:text-primary transition-colors">Về Chúng Tôi</button>
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden lg:block text-sm font-medium text-accent">
            Hotline: <a href="tel:0901234567" className="font-bold">0901 234 567</a>
          </div>
          <Button 
            onClick={() => scrollTo("contact")}
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium px-6 rounded-full"
          >
            Liên Hệ Ngay
          </Button>
        </div>
      </div>
    </header>
  );
}
