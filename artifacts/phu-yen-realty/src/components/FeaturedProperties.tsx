import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGetFeaturedProperties, useGetProperty } from "@workspace/api-client-react";
import { PropertyCard } from "./PropertyCard";
import { PropertyModal } from "./PropertyModal";
import { Skeleton } from "@/components/ui/skeleton";

export function FeaturedProperties() {
  const { data: properties, isLoading, isError } = useGetFeaturedProperties();
  const [selectedPropertyId, setSelectedPropertyId] = useState<number | null>(null);

  return (
    <section id="featured" className="py-24 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-primary font-medium tracking-widest uppercase text-sm mb-3">Sống Đẳng Cấp</h2>
            <h3 className="text-4xl md:text-5xl font-serif text-accent mb-6">Dự Án Nổi Bật</h3>
            <div className="w-16 h-1 bg-primary mx-auto mb-6 rounded-full" />
            <p className="text-muted-foreground text-lg">
              Những kiệt tác kiến trúc ven biển mang hơi thở thời đại, được thiết kế để đón trọn vẹn ánh sáng và gió biển miền Trung.
            </p>
          </motion.div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-64 w-full rounded-2xl" />
                <Skeleton className="h-6 w-2/3" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>
        ) : isError ? (
          <div className="text-center py-10 text-destructive">
            <p>Không thể tải dữ liệu dự án. Vui lòng thử lại sau.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties?.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <PropertyCard 
                  property={property} 
                  onClick={() => setSelectedPropertyId(property.id)} 
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedPropertyId && (
          <PropertyModal 
            propertyId={selectedPropertyId} 
            onClose={() => setSelectedPropertyId(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
}
