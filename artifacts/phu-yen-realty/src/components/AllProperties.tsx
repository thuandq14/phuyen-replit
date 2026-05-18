import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useListProperties } from "@workspace/api-client-react";
import { PropertyCard } from "./PropertyCard";
import { PropertyModal } from "./PropertyModal";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

export function AllProperties() {
  const { data: properties, isLoading } = useListProperties();
  const [selectedPropertyId, setSelectedPropertyId] = useState<number | null>(null);
  
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterType, setFilterType] = useState<string>("all");

  const filteredProperties = useMemo(() => {
    if (!properties) return [];
    return properties.filter((p) => {
      const matchCategory = filterCategory === "all" || p.category === filterCategory;
      const matchType = filterType === "all" || p.type === filterType;
      return matchCategory && matchType;
    });
  }, [properties, filterCategory, filterType]);

  return (
    <section id="properties" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-xl">
            <h2 className="text-primary font-medium tracking-widest uppercase text-sm mb-3">Bộ Sưu Tập</h2>
            <h3 className="text-4xl font-serif text-accent mb-4">Tất Cả Dự Án</h3>
            <p className="text-muted-foreground text-lg">
              Khám phá danh mục bất động sản đa dạng, từ những căn hộ biển đến siêu biệt thự đồi hướng vịnh.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="bg-white p-1 rounded-xl shadow-sm border border-border inline-flex">
              <Button 
                variant={filterCategory === "all" ? "default" : "ghost"} 
                size="sm"
                onClick={() => setFilterCategory("all")}
                className={`rounded-lg ${filterCategory === "all" ? "bg-accent text-white" : ""}`}
              >
                Tất cả phân khúc
              </Button>
              <Button 
                variant={filterCategory === "premium" ? "default" : "ghost"} 
                size="sm"
                onClick={() => setFilterCategory("premium")}
                className={`rounded-lg ${filterCategory === "premium" ? "bg-accent text-white" : ""}`}
              >
                Cao Cấp
              </Button>
              <Button 
                variant={filterCategory === "mid-range" ? "default" : "ghost"} 
                size="sm"
                onClick={() => setFilterCategory("mid-range")}
                className={`rounded-lg ${filterCategory === "mid-range" ? "bg-accent text-white" : ""}`}
              >
                Trung Cấp
              </Button>
            </div>

            <div className="bg-white p-1 rounded-xl shadow-sm border border-border inline-flex overflow-x-auto custom-scrollbar">
              <Button 
                variant={filterType === "all" ? "default" : "ghost"} 
                size="sm"
                onClick={() => setFilterType("all")}
                className="rounded-lg whitespace-nowrap"
              >
                Loại hình
              </Button>
              <Button 
                variant={filterType === "apartment" ? "default" : "ghost"} 
                size="sm"
                onClick={() => setFilterType("apartment")}
                className="rounded-lg whitespace-nowrap"
              >
                Căn hộ
              </Button>
              <Button 
                variant={filterType === "villa" ? "default" : "ghost"} 
                size="sm"
                onClick={() => setFilterType("villa")}
                className="rounded-lg whitespace-nowrap"
              >
                Biệt thự
              </Button>
              <Button 
                variant={filterType === "beachfront" ? "default" : "ghost"} 
                size="sm"
                onClick={() => setFilterType("beachfront")}
                className="rounded-lg whitespace-nowrap"
              >
                Mặt biển
              </Button>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-48 w-full rounded-2xl" />
                <Skeleton className="h-5 w-2/3" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProperties.length > 0 ? (
                filteredProperties.map((property, index) => (
                  <motion.div
                    key={property.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                  >
                    <PropertyCard 
                      property={property} 
                      onClick={() => setSelectedPropertyId(property.id)} 
                    />
                  </motion.div>
                ))
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full py-20 text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white mb-4 shadow-sm text-muted-foreground">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-medium text-accent mb-2">Không tìm thấy dự án</h4>
                  <p className="text-muted-foreground">Vui lòng thử thay đổi bộ lọc để xem các dự án khác.</p>
                  <Button 
                    variant="outline" 
                    className="mt-6"
                    onClick={() => { setFilterCategory("all"); setFilterType("all"); }}
                  >
                    Xóa bộ lọc
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
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
