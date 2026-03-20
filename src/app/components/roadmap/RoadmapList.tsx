import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  Map,
  Award,
  BookOpen,
  TrendingUp,
  ChevronRight,
  Sparkles,
  Target,
} from "lucide-react";
import { mockRoadmaps, mockCourses } from "../../data/mockData";

export function RoadmapList() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-6 py-8 max-w-7xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-2">
          Lộ Trình Học Tập 🗺️
        </h1>
        <p className="text-gray-600">
          Các lộ trình học được thiết kế bài bản giúp bạn đạt mục tiêu nghề nghiệp
        </p>
      </motion.div>

      {/* Featured Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-12"
      >
        <Card className="p-8 bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 text-white border-none overflow-hidden relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-6 h-6" />
                <span className="font-semibold">Lộ Trình Được Đề Xuất</span>
              </div>
              <h2 className="text-3xl font-bold mb-4">
                Xây Dựng Sự Nghiệp Công Nghệ
              </h2>
              <p className="text-purple-100 mb-6">
                Theo đuổi các lộ trình học có cấu trúc rõ ràng được thiết kế bởi các chuyên gia trong ngành. 
                Mỗi lộ trình bao gồm nhiều khóa học được sắp xếp theo thứ tự logic để tối ưu hóa việc học.
              </p>
              <div className="flex gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  <span>Có Mục Tiêu Rõ Ràng</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  <span>Từng Bước Tiến Bộ</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-lg">
                <Map className="w-8 h-8 mb-2" />
                <p className="text-2xl font-bold mb-1">{mockRoadmaps.length}</p>
                <p className="text-sm text-purple-100">Lộ Trình</p>
              </div>
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-lg">
                <BookOpen className="w-8 h-8 mb-2" />
                <p className="text-2xl font-bold mb-1">50+</p>
                <p className="text-sm text-purple-100">Khóa Học</p>
              </div>
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-lg">
                <Award className="w-8 h-8 mb-2" />
                <p className="text-2xl font-bold mb-1">100%</p>
                <p className="text-sm text-purple-100">Chứng Chỉ</p>
              </div>
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-lg">
                <TrendingUp className="w-8 h-8 mb-2" />
                <p className="text-2xl font-bold mb-1">4.9</p>
                <p className="text-sm text-purple-100">Đánh Giá</p>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Roadmap Cards */}
      <div className="space-y-6">
        {mockRoadmaps.map((roadmap, index) => {
          const roadmapCourses = roadmap.courses.map(rc => 
            mockCourses.find(c => c.id === rc.courseId)
          ).filter(Boolean);

          return (
            <motion.div
              key={roadmap.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-2xl transition-all border-purple-100 group cursor-pointer"
                onClick={() => navigate(`/roadmaps/${roadmap.id}`)}
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left - Main Info */}
                  <div className="lg:col-span-2 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                            <Map className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                              {roadmap.title}
                            </h3>
                            <p className="text-sm text-gray-600">Bởi {roadmap.teacherName}</p>
                          </div>
                        </div>
                        
                        <p className="text-gray-700 mb-4 leading-relaxed">
                          {roadmap.description}
                        </p>

                        {/* Tips */}
                        <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
                          <div className="flex items-start gap-2">
                            <Sparkles className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="font-semibold text-blue-900 mb-1">
                                💡 Lời Khuyên Từ Giảng Viên
                              </p>
                              <p className="text-sm text-blue-800">{roadmap.tips}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-6 mt-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <BookOpen className="w-5 h-5 text-purple-600" />
                        <span className="font-semibold">{roadmap.courses.length}</span>
                        <span className="text-sm">Khóa học</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Award className="w-5 h-5 text-yellow-600" />
                        <span className="text-sm">Chứng chỉ hoàn thành</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <TrendingUp className="w-5 h-5 text-green-600" />
                        <span className="text-sm">Phù hợp mọi trình độ</span>
                      </div>
                    </div>
                  </div>

                  {/* Right - Course Preview */}
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 lg:border-l border-purple-100">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-gray-900">Các Khóa Học</h4>
                      <Badge className="bg-purple-100 text-purple-700">
                        {roadmap.courses.length} khóa
                      </Badge>
                    </div>

                    <div className="space-y-3 mb-4">
                      {roadmapCourses.slice(0, 3).map((course, idx) => (
                        <div
                          key={course?.id}
                          className="flex items-center gap-3 p-3 bg-white rounded-lg"
                        >
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white font-bold text-sm flex-shrink-0">
                            {idx + 1}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm text-gray-900 truncate">
                              {course?.title}
                            </p>
                            <p className="text-xs text-gray-600">{course?.level}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Button
                      className="w-full gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/roadmaps/${roadmap.id}`);
                      }}
                    >
                      Xem Chi Tiết
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
