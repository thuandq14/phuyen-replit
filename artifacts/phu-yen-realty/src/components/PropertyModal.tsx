import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useGetProperty, getGetPropertyQueryKey } from "@workspace/api-client-react";
import { MapPin, BedDouble, Bath, Maximize, Check, X, Waves, Wind } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

interface PropertyModalProps {
  propertyId: number;
  onClose: () => void;
}

export function PropertyModal({ propertyId, onClose }: PropertyModalProps) {
  const { data: property, isLoading } = useGetProperty(propertyId, { 
    query: { enabled: !!propertyId, queryKey: getGetPropertyQueryKey(propertyId) } 
  });

  const [activeImage, setActiveImage] = useState<string | null>(null);

  useEffect(() => {
    if (property?.imageUrl) {
      setActiveImage(property.imageUrl);
    }
  }, [property]);

  const typeMap: Record<string, string> = {
    apartment: "Căn hộ",
    villa: "Biệt thự",
    townhouse: "Nhà phố",
    beachfront: "Mặt biển",
  };

  const scrollToContact = () => {
    onClose();
    setTimeout(() => {
      const el = document.getElementById("contact");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  return (
    <Dialog open={!!propertyId} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-5xl w-[95vw] max-h-[90vh] p-0 overflow-hidden bg-background border-none rounded-2xl shadow-2xl">
        {isLoading || !property ? (
          <div className="p-6 md:p-10 space-y-6">
            <Skeleton className="w-full aspect-[21/9] rounded-xl" />
            <Skeleton className="h-10 w-1/2" />
            <Skeleton className="h-6 w-1/3" />
            <div className="grid grid-cols-4 gap-4">
              <Skeleton className="h-24 rounded-lg" />
              <Skeleton className="h-24 rounded-lg" />
            </div>
          </div>
        ) : (
          <div className="flex flex-col h-full overflow-y-auto custom-scrollbar">
            <DialogHeader className="sr-only">
              <DialogTitle>{property.name}</DialogTitle>
              <DialogDescription>Chi tiết dự án {property.name}</DialogDescription>
            </DialogHeader>

            {/* Hero Image Section */}
            <div className="relative w-full bg-muted">
              <div className="aspect-[16/9] md:aspect-[21/9] relative overflow-hidden">
                <motion.img 
                  key={activeImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  src={activeImage || property.imageUrl} 
                  alt={property.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Header Info */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                  <Badge className="bg-primary text-primary-foreground mb-3 font-medium border-none shadow-sm">
                    {typeMap[property.type] || property.type}
                  </Badge>
                  <h2 className="text-3xl md:text-5xl font-serif font-bold text-white drop-shadow-md mb-2">
                    {property.name}
                  </h2>
                  <div className="flex items-center text-white/90 text-sm md:text-base font-medium">
                    <MapPin className="w-5 h-5 mr-2 shrink-0" />
                    {property.location}
                  </div>
                </div>
              </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6 md:p-10">
              
              {/* Main Info - Left 2 columns */}
              <div className="lg:col-span-2 space-y-10">
                {/* Quick Stats */}
                <div className="flex flex-wrap items-center gap-6 pb-6 border-b border-border">
                  <div className="flex flex-col">
                    <span className="text-muted-foreground text-sm font-medium uppercase tracking-wider mb-1">Giá Bán</span>
                    <span className="text-3xl font-bold text-primary">
                      {property.price} <span className="text-lg text-foreground font-medium">{property.priceUnit}</span>
                    </span>
                  </div>
                  <div className="w-px h-12 bg-border hidden sm:block" />
                  {property.bedrooms != null && (
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                        <BedDouble className="w-6 h-6" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-2xl font-bold text-accent">{property.bedrooms}</span>
                        <span className="text-muted-foreground text-sm font-medium">Phòng ngủ</span>
                      </div>
                    </div>
                  )}
                  {property.bathrooms != null && (
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                        <Bath className="w-6 h-6" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-2xl font-bold text-accent">{property.bathrooms}</span>
                        <span className="text-muted-foreground text-sm font-medium">Phòng tắm</span>
                      </div>
                    </div>
                  )}
                  {property.area != null && (
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                        <Maximize className="w-6 h-6" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-2xl font-bold text-accent">{property.area}</span>
                        <span className="text-muted-foreground text-sm font-medium">Mét vuông</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-2xl font-serif font-semibold text-accent mb-4">Tổng Quan Dự Án</h3>
                  <div className="prose max-w-none text-muted-foreground">
                    <p className="leading-relaxed whitespace-pre-line text-base md:text-lg">
                      {property.description || "Một tuyệt tác kiến trúc ven biển mang lại không gian sống hoàn hảo và thư giãn. Được thiết kế với tâm huyết, dự án mang lại giá trị bền vững và cơ hội đầu tư hấp dẫn."}
                    </p>
                  </div>
                </div>

                {/* Image Gallery */}
                {(property.images && property.images.length > 0) && (
                  <div>
                    <h3 className="text-2xl font-serif font-semibold text-accent mb-4">Thư Viện Ảnh</h3>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                      <div 
                        className={`relative aspect-square rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${activeImage === property.imageUrl ? "border-primary" : "border-transparent"}`}
                        onClick={() => setActiveImage(property.imageUrl)}
                      >
                        <img src={property.imageUrl} alt="Main" className="w-full h-full object-cover" />
                      </div>
                      {property.images.map((img, idx) => (
                        <div 
                          key={idx}
                          className={`relative aspect-square rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${activeImage === img ? "border-primary" : "border-transparent"}`}
                          onClick={() => setActiveImage(img)}
                        >
                          <img src={img} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar - Right 1 column */}
              <div className="space-y-8">
                {/* Special Features */}
                <div className="bg-muted/50 rounded-2xl p-6 border border-border">
                  <h4 className="font-serif font-semibold text-accent text-lg mb-4">Đặc Điểm Nổi Bật</h4>
                  <ul className="space-y-4">
                    {property.hasSeaView && (
                      <li className="flex items-start">
                        <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center mr-3 mt-0.5 shrink-0">
                          <Waves className="w-3.5 h-3.5 text-secondary" />
                        </div>
                        <span className="text-foreground font-medium">Tầm nhìn hướng biển tuyệt đẹp</span>
                      </li>
                    )}
                    {property.hasBalcony && (
                      <li className="flex items-start">
                        <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center mr-3 mt-0.5 shrink-0">
                          <Wind className="w-3.5 h-3.5 text-secondary" />
                        </div>
                        <span className="text-foreground font-medium">Ban công đón gió tự nhiên</span>
                      </li>
                    )}
                    {property.category === "premium" && (
                      <li className="flex items-start">
                        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mr-3 mt-0.5 shrink-0">
                          <Check className="w-3.5 h-3.5 text-primary" />
                        </div>
                        <span className="text-foreground font-medium">Bàn giao nội thất cao cấp</span>
                      </li>
                    )}
                  </ul>
                </div>

                {/* Amenities */}
                {property.amenities && property.amenities.length > 0 && (
                  <div>
                    <h4 className="font-serif font-semibold text-accent text-lg mb-4">Tiện Ích Nội Khu</h4>
                    <div className="flex flex-wrap gap-2">
                      {property.amenities.map((amenity, idx) => (
                        <Badge key={idx} variant="outline" className="bg-white px-3 py-1.5 text-sm font-medium border-border text-muted-foreground">
                          {amenity}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA */}
                <div className="pt-4">
                  <Button 
                    onClick={scrollToContact}
                    className="w-full h-14 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
                  >
                    Nhận Báo Giá Chi Tiết
                  </Button>
                  <p className="text-center text-xs text-muted-foreground mt-3">
                    Để lại thông tin, chuyên viên sẽ liên hệ trong 15 phút.
                  </p>
                </div>
              </div>

            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
