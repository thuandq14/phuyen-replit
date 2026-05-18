import { useListInquiries } from "@workspace/api-client-react";
import { format } from "date-fns";

export default function Admin() {
  const { data: inquiries, isLoading } = useListInquiries();

  return (
    <div className="container mx-auto py-12 px-6">
      <h1 className="text-3xl font-serif text-accent mb-8">Danh sách yêu cầu tư vấn</h1>
      
      {isLoading ? (
        <div className="text-center py-12">Đang tải dữ liệu...</div>
      ) : inquiries && inquiries.length > 0 ? (
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted text-accent">
                <th className="p-4 font-medium border-b border-border">Khách hàng</th>
                <th className="p-4 font-medium border-b border-border">Liên hệ</th>
                <th className="p-4 font-medium border-b border-border">Dự án quan tâm</th>
                <th className="p-4 font-medium border-b border-border">Lời nhắn</th>
                <th className="p-4 font-medium border-b border-border">Ngày gửi</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.map((inq) => (
                <tr key={inq.id} className="hover:bg-muted/50 border-b border-border">
                  <td className="p-4">{inq.fullName}</td>
                  <td className="p-4">
                    <div>{inq.phone}</div>
                    <div className="text-sm text-muted-foreground">{inq.email}</div>
                  </td>
                  <td className="p-4">
                    <span className="inline-block px-2 py-1 bg-primary/10 text-primary rounded text-sm">
                      {inq.projectInterest}
                    </span>
                  </td>
                  <td className="p-4 max-w-xs truncate">{inq.message || "-"}</td>
                  <td className="p-4 text-sm text-muted-foreground">
                    {format(new Date(inq.createdAt), "dd/MM/yyyy HH:mm")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow p-12 text-center text-muted-foreground">
          Chưa có yêu cầu tư vấn nào.
        </div>
      )}
    </div>
  );
}
