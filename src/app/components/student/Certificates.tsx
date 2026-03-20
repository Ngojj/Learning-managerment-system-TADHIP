import { motion } from "motion/react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import {
  Award,
  Download,
  Share2,
  Calendar,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { mockCertificates } from "../../data/mockData";

export function Certificates() {
  const studentName = localStorage.getItem("currentUser") || "Student";

  const handleDownload = (certId: string) => {
    // Mock download
    console.log("Downloading certificate:", certId);
  };

  const handleShare = (certId: string) => {
    // Mock share
    console.log("Sharing certificate:", certId);
  };

  return (
    <div className="container mx-auto px-6 py-8 max-w-7xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 bg-clip-text text-transparent mb-2">
          Chứng Chỉ Của Tôi 🏆
        </h1>
        <p className="text-gray-600">
          Tất cả chứng chỉ bạn đã đạt được trong quá trình học tập
        </p>
      </motion.div>

      {/* Stats Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-12"
      >
        <Card className="p-8 bg-gradient-to-br from-yellow-500 via-orange-500 to-red-500 text-white border-none overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                <Award className="w-8 h-8" />
                <span className="text-sm font-semibold">Tổng Chứng Chỉ</span>
              </div>
              <p className="text-5xl font-bold">{mockCertificates.length}</p>
            </div>
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                <CheckCircle2 className="w-8 h-8" />
                <span className="text-sm font-semibold">Khóa Học Hoàn Thành</span>
              </div>
              <p className="text-5xl font-bold">{mockCertificates.length}</p>
            </div>
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                <Sparkles className="w-8 h-8" />
                <span className="text-sm font-semibold">Thành Tích</span>
              </div>
              <p className="text-5xl font-bold">100%</p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Certificates Grid */}
      {mockCertificates.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {mockCertificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-2xl transition-all border-2 border-yellow-200">
                {/* Certificate Design */}
                <div className="relative bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 p-8 border-b-8 border-yellow-400">
                  {/* Decorative corners */}
                  <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-yellow-400 rounded-tl-lg" />
                  <div className="absolute top-0 right-0 w-20 h-20 border-t-4 border-r-4 border-yellow-400 rounded-tr-lg" />
                  <div className="absolute bottom-0 left-0 w-20 h-20 border-b-4 border-l-4 border-yellow-400 rounded-bl-lg" />
                  <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-yellow-400 rounded-br-lg" />

                  {/* Content */}
                  <div className="relative z-10 text-center">
                    {/* Award Icon */}
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg">
                      <Award className="w-10 h-10 text-white" />
                    </div>

                    {/* Title */}
                    <h3 className="text-sm uppercase tracking-wider text-gray-600 mb-2">
                      Chứng Chỉ Hoàn Thành
                    </h3>
                    <div className="w-16 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto mb-4" />

                    {/* Course Name */}
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      {cert.courseName}
                    </h2>

                    {/* Student Name */}
                    <p className="text-gray-700 mb-2">
                      Được trao cho
                    </p>
                    <p className="text-3xl font-bold bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 bg-clip-text text-transparent mb-6">
                      {cert.studentName}
                    </p>

                    {/* Date */}
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mb-2">
                      <Calendar className="w-4 h-4" />
                      <span>
                        Ngày cấp: {new Date(cert.issueDate).toLocaleDateString("vi-VN")}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      Hết hạn: {new Date(cert.expiryDate).toLocaleDateString("vi-VN")}
                    </div>

                    {/* Certificate ID */}
                    <div className="mt-6 pt-4 border-t border-gray-300">
                      <p className="text-xs text-gray-500">
                        Mã chứng chỉ: {cert.id.toUpperCase()}
                      </p>
                    </div>
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute top-1/2 left-8 w-3 h-3 bg-yellow-400 rounded-full opacity-50" />
                  <div className="absolute top-1/2 right-8 w-3 h-3 bg-orange-400 rounded-full opacity-50" />
                  <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-red-400 rounded-full opacity-30" />
                  <div className="absolute top-3/4 right-1/4 w-2 h-2 bg-yellow-400 rounded-full opacity-30" />
                </div>

                {/* Actions */}
                <div className="p-4 bg-white flex gap-3">
                  <Button
                    className="flex-1 gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                    onClick={() => handleDownload(cert.id)}
                  >
                    <Download className="w-4 h-4" />
                    Tải Xuống
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 gap-2 border-purple-300 hover:bg-purple-50"
                    onClick={() => handleShare(cert.id)}
                  >
                    <Share2 className="w-4 h-4" />
                    Chia Sẻ
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <Award className="w-24 h-24 text-gray-300 mx-auto mb-6" />
          <h3 className="text-2xl font-semibold text-gray-600 mb-2">
            Chưa Có Chứng Chỉ
          </h3>
          <p className="text-gray-500 mb-6">
            Hoàn thành các khóa học để nhận chứng chỉ
          </p>
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600">
            Khám Phá Khóa Học
          </Button>
        </motion.div>
      )}

      {/* Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-12"
      >
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 mb-2">
                Về Chứng Chỉ TADHIP
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Chứng chỉ TADHIP được cấp cho các học viên hoàn thành toàn bộ nội dung khóa học 
                và đạt điểm tối thiểu yêu cầu. Chứng chỉ có giá trị 2 năm kể từ ngày cấp và được 
                công nhận bởi nhiều doanh nghiệp công nghệ hàng đầu.
              </p>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
