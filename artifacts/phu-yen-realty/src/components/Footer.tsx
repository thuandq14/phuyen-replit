import { Facebook, Instagram, Youtube, MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-accent text-white pt-20 pb-10 border-t border-accent-foreground/20">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          <div className="lg:col-span-1">
            <h2 className="text-3xl font-serif font-bold text-primary mb-6">Phu Yen Realty</h2>
            <p className="text-white/70 mb-6 leading-relaxed text-sm">
              Đơn vị tiên phong phát triển bất động sản nghỉ dưỡng và nhà ở cao cấp tại Phú Yên. Kiến tạo di sản ven biển vững bền cho thế hệ tương lai.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-accent transition-all">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-accent transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-accent transition-all">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 font-serif uppercase tracking-wider text-white">Liên Kết Nhanh</h4>
            <ul className="space-y-4">
              <li><button onClick={() => scrollTo("hero")} className="text-white/70 hover:text-primary transition-colors text-sm">Trang Chủ</button></li>
              <li><button onClick={() => scrollTo("about")} className="text-white/70 hover:text-primary transition-colors text-sm">Về Chúng Tôi</button></li>
              <li><button onClick={() => scrollTo("featured")} className="text-white/70 hover:text-primary transition-colors text-sm">Dự Án Nổi Bật</button></li>
              <li><button onClick={() => scrollTo("properties")} className="text-white/70 hover:text-primary transition-colors text-sm">Tất Cả Dự Án</button></li>
              <li><button onClick={() => scrollTo("contact")} className="text-white/70 hover:text-primary transition-colors text-sm">Tuyển Dụng</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 font-serif uppercase tracking-wider text-white">Phân Khúc</h4>
            <ul className="space-y-4">
              <li><a href="#properties" className="text-white/70 hover:text-primary transition-colors text-sm">Biệt Thự Biển Cao Cấp</a></li>
              <li><a href="#properties" className="text-white/70 hover:text-primary transition-colors text-sm">Căn Hộ Nghỉ Dưỡng</a></li>
              <li><a href="#properties" className="text-white/70 hover:text-primary transition-colors text-sm">Nhà Phố Thương Mại</a></li>
              <li><a href="#properties" className="text-white/70 hover:text-primary transition-colors text-sm">Dinh Thự Đồi Hướng Vịnh</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 font-serif uppercase tracking-wider text-white">Liên Hệ</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-primary mr-3 shrink-0" />
                <span className="text-white/70 text-sm">Tòa nhà PY Tower, 123 Đại lộ Hùng Vương, TP. Tuy Hòa, Phú Yên</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 text-primary mr-3 shrink-0" />
                <span className="text-white/70 text-sm">0901 234 567 (Hotline 24/7)</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 text-primary mr-3 shrink-0" />
                <span className="text-white/70 text-sm">info@phuyenrealty.vn</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between">
          <p className="text-white/50 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Phu Yen Realty. Tất cả quyền được bảo lưu.
          </p>
          <div className="flex gap-6 text-sm text-white/50">
            <a href="#" className="hover:text-white transition-colors">Điều khoản sử dụng</a>
            <a href="#" className="hover:text-white transition-colors">Chính sách bảo mật</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
