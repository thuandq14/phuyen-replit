import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Images Layout */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative z-10 w-4/5 rounded-3xl overflow-hidden shadow-2xl border-4 border-white"
            >
              <img src="/images/prop-5.png" alt="Phu Yen Realty Architecture" className="w-full h-auto aspect-[4/5] object-cover" />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="absolute -bottom-12 right-0 w-3/5 rounded-3xl overflow-hidden shadow-2xl border-4 border-white z-20"
            >
              <img src="/images/prop-10.png" alt="Phu Yen Coastal View" className="w-full h-auto aspect-square object-cover" />
            </motion.div>

            {/* Decorative element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/10 rounded-full blur-3xl -z-10" />
          </div>

          {/* Content */}
          <div className="lg:pl-8 mt-12 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-primary font-medium tracking-widest uppercase text-sm mb-3">Về Chúng Tôi</h2>
              <h3 className="text-4xl md:text-5xl font-serif text-accent mb-6 leading-tight">
                Kiến Tạo Di Sản <br/>
                Bên Bờ Biển Vàng
              </h3>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Phu Yen Realty không chỉ xây dựng những ngôi nhà, chúng tôi kiến tạo một phong cách sống. Tận dụng tối đa vẻ đẹp nguyên sơ của đường bờ biển Phú Yên và đầm Ô Loan, mỗi dự án là một sự kết hợp hoàn hảo giữa thiên nhiên và kiến trúc hiện đại.
              </p>
              
              <ul className="space-y-5">
                {[
                  "Vị trí đắc địa, tiềm năng tăng giá bền vững",
                  "Thiết kế mở, tối ưu ánh sáng và gió biển tự nhiên",
                  "Pháp lý minh bạch, sở hữu lâu dài",
                  "Cộng đồng văn minh, tiện ích nghỉ dưỡng đẳng cấp"
                ].map((item, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                    className="flex items-start"
                  >
                    <div className="mt-1 mr-4 bg-primary/20 p-1 rounded-full text-primary shrink-0">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <span className="text-accent font-medium text-lg">{item}</span>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-12 pt-8 border-t border-border grid grid-cols-3 gap-6">
                <div>
                  <div className="text-4xl font-serif font-bold text-primary mb-1">15+</div>
                  <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Năm Kinh Nghiệm</div>
                </div>
                <div>
                  <div className="text-4xl font-serif font-bold text-primary mb-1">20+</div>
                  <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Dự Án Hoàn Thành</div>
                </div>
                <div>
                  <div className="text-4xl font-serif font-bold text-primary mb-1">10k</div>
                  <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Khách Hàng An Cư</div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
