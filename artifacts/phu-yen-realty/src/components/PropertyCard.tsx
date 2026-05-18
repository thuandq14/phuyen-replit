import { MapPin, BedDouble, Bath, Maximize, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Property } from "@workspace/api-client-react";

interface PropertyCardProps {
  property: Property;
  onClick: () => void;
}

export function PropertyCard({ property, onClick }: PropertyCardProps) {
  // Translate types to Vietnamese
  const typeMap: Record<string, string> = {
    apartment: "Căn hộ",
    villa: "Biệt thự",
    townhouse: "Nhà phố",
    beachfront: "Mặt biển",
  };

  const statusMap: Record<string, { label: string; variant: "default" | "secondary" | "destructive" }> = {
    available: { label: "Đang mở bán", variant: "default" },
    "sold-out": { label: "Đã bán hết", variant: "destructive" },
    "coming-soon": { label: "Sắp ra mắt", variant: "secondary" },
  };

  const statusInfo = property.status ? statusMap[property.status] : statusMap["available"];

  return (
    <div 
      className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer h-full"
      onClick={onClick}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={property.imageUrl || "/images/hero.png"} 
          alt={property.name}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {property.category === "premium" && (
            <Badge className="bg-accent text-accent-foreground border-none font-medium px-3 py-1 text-xs">
              Cao Cấp
            </Badge>
          )}
          <Badge className="bg-black/60 text-white border-none font-medium px-3 py-1 text-xs backdrop-blur-md">
            {typeMap[property.type] || property.type}
          </Badge>
        </div>

        <div className="absolute top-4 right-4">
          <Badge variant={statusInfo?.variant} className="font-medium px-3 py-1 text-xs shadow-sm">
            {statusInfo?.label}
          </Badge>
        </div>

        {/* Price Tag */}
        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg border border-white/20">
          <div className="text-primary font-bold text-lg leading-none">
            {property.price} <span className="text-sm font-medium text-muted-foreground">{property.priceUnit}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <h4 className="text-xl font-serif font-semibold text-accent mb-2 group-hover:text-primary transition-colors line-clamp-1">
          {property.name}
        </h4>
        
        <div className="flex items-center text-muted-foreground mb-4 text-sm">
          <MapPin className="w-4 h-4 mr-1.5 shrink-0" />
          <span className="line-clamp-1">{property.location}</span>
        </div>

        {/* Amenities Row */}
        <div className="grid grid-cols-3 gap-4 py-4 border-t border-border mt-auto">
          {property.bedrooms != null && (
            <div className="flex items-center text-accent text-sm font-medium">
              <BedDouble className="w-4 h-4 text-primary mr-2" />
              <span>{property.bedrooms} PN</span>
            </div>
          )}
          {property.bathrooms != null && (
            <div className="flex items-center text-accent text-sm font-medium">
              <Bath className="w-4 h-4 text-primary mr-2" />
              <span>{property.bathrooms} PT</span>
            </div>
          )}
          {property.area != null && (
            <div className="flex items-center text-accent text-sm font-medium">
              <Maximize className="w-4 h-4 text-primary mr-2" />
              <span>{property.area} m²</span>
            </div>
          )}
        </div>

        {/* Action hint */}
        <div className="pt-4 border-t border-border flex items-center justify-between mt-2">
          <span className="text-sm font-medium text-primary">Xem chi tiết</span>
          <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
}
