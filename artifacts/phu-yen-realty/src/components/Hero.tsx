import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Hero() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: "url('/images/hero.png')",
        }}
      >
        {/* Dark gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20" />
      </div>

      <div className="container relative z-10 mx-auto px-6 md:px-12 pt-20">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-7xl font-serif text-white leading-tight mb-6 drop-shadow-sm">
              Nơi Núi Rừng <br/>
              <span className="text-primary italic">Giao Hòa</span> Cùng Biển Cả
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <p className="text-lg md:text-xl text-white/90 mb-10 max-w-xl font-light drop-shadow-sm">
              Sở hữu ngôi nhà mơ ước bên bờ biển Phú Yên. Tận hưởng ánh nắng vàng ươm, bình yên bên đầm Ô Loan và phong cách sống hiện đại.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex flex-wrap gap-4"
          >
            <Button 
              size="lg" 
              onClick={() => scrollTo("contact")}
              className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 h-14 rounded-full"
            >
              Nhận Tư Vấn Ngay
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => scrollTo("featured")}
              className="bg-white/10 hover:bg-white/20 text-white border-white/30 text-lg px-8 h-14 rounded-full backdrop-blur-sm"
            >
              Khám Phá Dự Án
            </Button>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center cursor-pointer text-white/70 hover:text-white"
        onClick={() => scrollTo("featured")}
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <span className="text-xs uppercase tracking-widest mb-2 font-medium">Cuộn Xuống</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/70 to-transparent" />
      </motion.div>
    </section>
  );
}
