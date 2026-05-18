import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSubmitContact } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Phone, Mail, MapPin } from "lucide-react";

const formSchema = z.object({
  fullName: z.string().min(2, "Vui lòng nhập họ tên hợp lệ"),
  phone: z.string().min(9, "Số điện thoại phải có ít nhất 9 số"),
  email: z.string().email("Email không hợp lệ").optional().or(z.literal("")),
  projectInterest: z.string().min(1, "Vui lòng chọn loại hình quan tâm"),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function ContactSection() {
  const { toast } = useToast();
  const submitMutation = useSubmitContact();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      projectInterest: "",
      message: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    submitMutation.mutate(
      { data },
      {
        onSuccess: () => {
          toast({
            title: "Gửi thông tin thành công!",
            description: "Chuyên viên của chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.",
            variant: "default",
          });
          form.reset();
        },
        onError: () => {
          toast({
            title: "Có lỗi xảy ra",
            description: "Không thể gửi thông tin lúc này. Vui lòng thử lại sau.",
            variant: "destructive",
          });
        }
      }
    );
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background with slight tint */}
      <div className="absolute inset-0 bg-accent -z-20" />
      <div 
        className="absolute inset-0 opacity-10 bg-cover bg-center -z-10 mix-blend-overlay"
        style={{ backgroundImage: "url('/images/prop-1.png')" }}
      />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
          
          {/* Left Info Panel */}
          <div className="bg-primary p-10 md:p-12 text-primary-foreground md:w-2/5 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-12 -left-12 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="relative z-10">
              <h3 className="text-3xl font-serif font-bold mb-4">Nhận Thông Tin Trực Tiếp</h3>
              <p className="text-primary-foreground/80 mb-10">
                Hãy để lại thông tin để nhận bảng giá chi tiết, quỹ căn đẹp nhất và chính sách bán hàng mới nhất từ chủ đầu tư.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-4 shrink-0">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-primary-foreground/70 mb-1">Hotline CSKH 24/7</div>
                    <a href="tel:0901234567" className="text-xl font-bold hover:underline">0901 234 567</a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-4 shrink-0">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-primary-foreground/70 mb-1">Email</div>
                    <a href="mailto:sales@phuyenrealty.vn" className="text-lg font-medium hover:underline">sales@phuyenrealty.vn</a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-4 shrink-0">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-primary-foreground/70 mb-1">Văn Phòng Bán Hàng</div>
                    <div className="text-lg font-medium">123 Đại lộ Hùng Vương, Tuy Hòa, Phú Yên</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form Panel */}
          <div className="p-10 md:p-12 md:w-3/5 bg-white">
            <h4 className="text-2xl font-serif font-bold text-accent mb-6">Đăng Ký Tư Vấn</h4>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-accent font-medium">Họ và tên *</FormLabel>
                        <FormControl>
                          <Input placeholder="Nhập họ và tên" className="bg-muted/50 border-transparent focus-visible:ring-primary focus-visible:bg-white transition-all h-12" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-accent font-medium">Số điện thoại *</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="Nhập số điện thoại" className="bg-muted/50 border-transparent focus-visible:ring-primary focus-visible:bg-white transition-all h-12" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-accent font-medium">Email (Tùy chọn)</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Nhập địa chỉ email" className="bg-muted/50 border-transparent focus-visible:ring-primary focus-visible:bg-white transition-all h-12" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="projectInterest"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-accent font-medium">Loại hình quan tâm *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-muted/50 border-transparent focus-visible:ring-primary focus-visible:bg-white transition-all h-12">
                            <SelectValue placeholder="Chọn loại bất động sản" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="apartment">Căn hộ biển</SelectItem>
                          <SelectItem value="villa">Biệt thự đồi</SelectItem>
                          <SelectItem value="beachfront">Dinh thự mặt biển</SelectItem>
                          <SelectItem value="townhouse">Nhà phố thương mại</SelectItem>
                          <SelectItem value="other">Chưa xác định - Cần tư vấn</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-accent font-medium">Lời nhắn (Tùy chọn)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Yêu cầu riêng của bạn..." 
                          className="resize-none bg-muted/50 border-transparent focus-visible:ring-primary focus-visible:bg-white transition-all h-24" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full h-14 text-lg font-bold rounded-xl mt-4"
                  disabled={submitMutation.isPending}
                >
                  {submitMutation.isPending ? "Đang gửi..." : "Gửi Yêu Cầu"}
                </Button>
                
                <p className="text-xs text-muted-foreground text-center mt-4">
                  Thông tin của bạn được bảo mật tuyệt đối và chỉ dùng cho mục đích tư vấn dự án.
                </p>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
