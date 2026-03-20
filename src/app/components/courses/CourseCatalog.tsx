import { useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import {
  Search,
  Filter,
  Star,
  Users,
  Clock,
  BookOpen,
  TrendingUp,
} from "lucide-react";
import { mockCourses } from "../../data/mockData";

export function CourseCatalog() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<string>("all");

  const levels = ["all", "Beginner", "Intermediate", "Advanced"];
  
  const filteredCourses = mockCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = selectedLevel === "all" || course.level === selectedLevel;
    return matchesSearch && matchesLevel;
  });

  return (
    <div className="container mx-auto px-6 py-8 max-w-7xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-2">
          Khám Phá Khóa Học 🚀
        </h1>
        <p className="text-gray-600">Tìm khóa học phù hợp để phát triển kỹ năng của bạn</p>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8 space-y-4"
      >
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Tìm kiếm khóa học..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-14 text-lg border-purple-200 focus:border-purple-500"
          />
        </div>

        {/* Level Filter */}
        <div className="flex items-center gap-3">
          <Filter className="w-5 h-5 text-gray-600" />
          <div className="flex gap-2 flex-wrap">
            {levels.map(level => (
              <Button
                key={level}
                variant={selectedLevel === level ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedLevel(level)}
                className={selectedLevel === level 
                  ? "bg-gradient-to-r from-purple-600 to-pink-600" 
                  : "hover:border-purple-400"}
              >
                {level === "all" ? "Tất cả" : level}
              </Button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Featured Courses Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <Card className="p-8 bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 text-white border-none overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-6 h-6" />
              <span className="font-semibold">Khóa Học Nổi Bật</span>
            </div>
            <h2 className="text-3xl font-bold mb-2">
              {filteredCourses.length} Khóa Học Chất Lượng Cao
            </h2>
            <p className="text-purple-100 mb-4 max-w-2xl">
              Được giảng dạy bởi các chuyên gia hàng đầu với nội dung được cập nhật liên tục
            </p>
            <div className="flex gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>5000+ Học viên</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-yellow-300 text-yellow-300" />
                <span>4.8 Đánh giá</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                <span>100+ Giờ nội dung</span>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            <Card
              className="overflow-hidden hover:shadow-2xl transition-all cursor-pointer border-purple-100 group"
              onClick={() => navigate(`/courses/${course.id}`)}
            >
              {/* Course Image */}
              <div className="relative overflow-hidden h-48">
                <img
                  src={course.imageUrl}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3">
                  <Badge className={`
                    ${course.level === "Beginner" ? "bg-green-500" : ""}
                    ${course.level === "Intermediate" ? "bg-yellow-500" : ""}
                    ${course.level === "Advanced" ? "bg-red-500" : ""}
                  `}>
                    {course.level}
                  </Badge>
                </div>
                {course.progress !== undefined && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
                    <div
                      className="h-full bg-gradient-to-r from-purple-600 to-pink-600"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                )}
              </div>

              {/* Course Content */}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  {course.tags.slice(0, 2).map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-purple-50 text-purple-600 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
                  {course.title}
                </h3>

                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {course.description}
                </p>

                <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                  <img
                    src={`https://ui-avatars.com/api/?name=${course.teacherName}&background=random`}
                    alt={course.teacherName}
                    className="w-6 h-6 rounded-full"
                  />
                  <span>{course.teacherName}</span>
                </div>

                <div className="flex items-center justify-between text-sm mb-4">
                  <div className="flex items-center gap-1 text-yellow-600">
                    <Star className="w-4 h-4 fill-yellow-400" />
                    <span className="font-semibold">{course.rating}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>{course.enrolledCount.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{course.language === "vi" ? "Tiếng Việt" : "English"}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    {(course.price / 1000000).toFixed(1)}M VND
                  </span>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    {course.progress !== undefined ? "Tiếp tục học" : "Đăng ký"}
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            Không tìm thấy khóa học
          </h3>
          <p className="text-gray-500">
            Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc
          </p>
        </motion.div>
      )}
    </div>
  );
}
